import database from '../firebase/firebase';
import moment from 'moment';
import { history } from '../routes/AppRouter'
import { startEditUser } from '../actions/user';
import { startAddOrder, startEditOrder } from '../actions/order';
import { Encrypt, Decrypt } from './Cryptografy';
import { createCustomer, getAllCustomer, addCreditCard, createOrder, createPayment } from '../api/moip/moip';

export function getCustomersMoip() {
    const allCustomerMoip = getAllCustomer();
    var db = [];
    allCustomerMoip.then((snap) => {
        snap.forEach((user) => {
            db.push(user);
        });
    });

    return db;
}

export function getCustomer() {
    const data = [];

    database.ref(`users`)
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                database.ref(`users/${child.key}/data`)
                    .once('value')
                    .then((snap) => {
                        snap.forEach((user) => {
                            data.push({
                                _id: user.key,
                                ...user.val()
                            });
                        });
                    });
            });
        });

    return data;
};

export function getInfo(data) {
    var db = data.data;
    var email = data.user_email;
    var customer = '';

    db.forEach((user) => {
        if (user.email.toUpperCase() === email.toUpperCase()) {
            customer = user;
        }
    });

    return customer;

};
export function customerMoipExist(data, email) {

    var email = email;
    var customer = '';
    data.forEach((user) => {
        if (user.email.toUpperCase() === email.toUpperCase()) {
            customer = user;
        }
    });

    return customer;

};

export function makePayment(data) {

    //console.log(data);


    const customer = getInfo(data);

    var card = {
        name: data.card_name,
        number: data.card_number,
        birthdayDate: data.card_birthdayDate,
        document: data.card_document,
        cvv: data.card_cvv,
        expirationDate: data.card_expirationDate,
        saveCard: data.card_saveCard,
        idMoip: ''
    };

    // console.log(card);



    var dataEncrypt = data.card_saveCard ? card : '';
    //var dataEncrypt = data.card_saveCard ? Encrypt(JSON.stringify(card)) : '';

    var user = {
        uid: customer.uid,
        id: customer._id,
        idMoip: '',
        firstName: data.user_firstName,
        lastName: data.user_lastName,
        rg: data.user_rg,
        cpf: data.user_cpf,
        email: data.user_email,
        birthday: data.user_birthday,
        address: {
            street: data.user_address_street,
            city: data.user_address_city,
            state: data.user_address_state,
            zip: data.user_address_zip,
            obs: data.user_address_obs
        },
        billingAddress: {
            street: data.billingAddress_street,
            city: data.billingAddress_city,
            state: data.billingAddress_state,
            zip: data.billingAddress_zip,
            obs: data.billingAddress_obs
        },
        card: dataEncrypt

    };



    const customerMoip = customerMoipExist(data.moip, user.email);

    //console.log(customerMoip);

    if (customerMoip && (customerMoip.ownId === user.uid)) {
        user.idMoip = customerMoip.id
    }
    else {
        const info = {
            'ownId': user.uid,
            'fullname': user.firstName + ' ' + user.lastName,
            'email': user.email,
            'birthDate': user.birthday,
            'taxDocument': {
                'type': 'CPF',
                'number': user.document
            }
        };

        const customerMoipId = createCustomer(info);
        //console.log(customerMoipId.id);
        user.idMoip = customerMoipId.id;

    };

    const bithFormatted = `${card.birthdayDate.substring(4, 8)}-${card.birthdayDate.substring(2, 4)}-${card.birthdayDate.substring(0, 2)}`;
    const dataCard = {
        'method': 'CREDIT_CARD',
        'creditCard': {
            'expirationMonth': card.expirationDate.substring(0, 2),
            'expirationYear': card.expirationDate.substring(2, 4),
            'number': card.number,
            'cvc': card.cvv,
            'holder': {
                'fullname': card.name,
                'birthdate': bithFormatted,
                'taxDocument': {
                    'type': 'CPF',
                    'number': card.document
                }
            }
        }
    };

    //console.log(dataCard);

    addCreditCard(user.idMoip, dataCard).then(function (id) {


        //ATUALIZA BASE DE DADOS COM TODOS OS DADOS DO CLIENTE, INCLUSIVE MOIPID
        card.idMoip = id;
        startEditUser(user);
    });

    var order = {
        id: '',
        idOrderMoip: '',
        idPaymentMoip: '',
        id_product: data.order_id,
        id_locador: user.uid,
        id_locatario: data.order_contact,
        category: data.order_category,
        startDate: data.order_startDate,
        endDate: data.order_endDate,
        price: data.order_price,
        days: data.order_days,
        priceTotal: (data.order_price * data.order_days),
        card: dataEncrypt,
        status: 'EM PROCESSO DE PAGAMENTO',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss.ms'),

    }


    //GRAVA PEDIDO NA BASE DE DADO
    var orderId = startAddOrder(user, order);
    order.id = orderId;

    const orderMoip = {
        "ownId": order.id,
        "amount": {
            "currency": "BRL",
            "subtotals": {
                "shipping": 0
            }
        },
        "items": [
            {
                "product": order.category,
                "category": "OTHER_CATEGORIES",
                "quantity": 1,
                "detail": `ALUGUEL DO EQUIPAMENTO ${order.category} DE ${order.startDate} ATÉ ${order.endDate} NO VALOR TOTAL DE ${order.priceTotal}`,
                "price": order.priceTotal
            }
        ],
        "customer": {
            "id": user.idMoip
        },
        "receivers": [
            {
                "type": "PRIMARY",
                "feePayor": false,
                "moipAccount": {
                    "id": "MPA-3C5358FF2296" //TODO
                },
                "amount": {
                    "percentual": 20
                }
            },
            {
                "type": "SECONDARY",
                "feePayor": true,
                "moipAccount": {
                    "id": "MPA-E3C8493A06AE" //TODO
                },
                "amount": {
                    "percentual": 80
                }
            }
        ]
    };

    //console.log(JSON.stringify(orderMoip));

    createOrder(orderMoip).then(function (data) {
        order.idOrderMoip = data.id;
        startEditOrder(user.uid, order);

        if (order.idOrderMoip) {
            var payment = {
                "installmentCount": 1,
                "statementDescriptor": "eVolume - Aluguel de acessórios para carros",
                "fundingInstrument": {
                    "method": "CREDIT_CARD",
                    "creditCard": {
                        "id": card.idOrderMoip,
                        "store": false,
                        "holder": {
                            'fullname': card.name,
                            'birthdate': bithFormatted,
                            'taxDocument': {
                                'type': 'CPF',
                                'number': card.document
                            }
                        }
                    }
                }
            };
            // createPayment(order.idMoip, payment).then(function (pay) {
            //     order.idPaymentMoip = pay.id;
            //     order.status = pay.status;
            //     startEditOrder(user.uid, order);
            // });

            //MOCK
            var resp = createPayment(order.idMoip, payment);
            order.idPaymentMoip = resp.id;
            order.status = resp.status;
            startEditOrder(user.uid, order);
            console.log()

            history.push(`/contrato/${order.idOrderMoip}`);

        }

        

    });









};

