import database from '../firebase/firebase';
import moment from 'moment';
import numeral from 'numeral';
import { history } from '../routes/AppRouter'
import { startEditUser } from '../actions/user';
import { startAddOrder, startEditOrder } from '../actions/order';
import { Encrypt, Decrypt } from './Cryptografy';
import { createCustomer, getAllCustomer, addCreditCard, createOrder, createPayment, cryptCard } from '../api/moip/moip';
import { send } from '../api/mail/mail';
import MoipValidator from '../api/moip/validator';

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

export function getInfo(data, email) {
    var db = data.data;
    var email = email;
    var customer = '';

    db.forEach((user) => {
        if (user.email.toUpperCase() === email.toUpperCase()) {
            customer = user;
        }
    });

    return customer;

};
export function customerMoipExist(data, email, id) {

    var email = email;
    var customer = '';
    data.forEach((user) => {
        if (user.email.toUpperCase() === email.toUpperCase()
            && user.ownId === id) {
            customer = user;
        }
    });

    return customer;

};


export function startOrder(data, card, user, locador) {

    var order = {
        id: '',
        idOrderMoip: '',
        idPaymentMoip: '',
        idProduct: data.order_id,
        idLocador: locador.uid || locador.id,
        idLocatario: user.uid,
        category: data.order_category,
        startDate: data.order_startDate,
        endDate: data.order_endDate,
        price: data.order_price,
        image: data.order_image,
        days: data.order_days,
        priceTotal: numeral(data.order_price * data.order_days).format('0.00').replace('.', ''),
        card: user.card,
        status: 'EM PROCESSO DE PAGAMENTO',
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss.ms'),

    }


    //GRAVA PEDIDO NA BASE DE DADO
    var orderId = startAddOrder(user, order);
    order.id = orderId;

    var orderResume = `ALUGUEL DO EQUIPAMENTO ${order.category} DE ${order.startDate} ATÉ ${order.endDate} NO VALOR TOTAL DE ${numeral(order.priceTotal).format('0.00')}`;

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
                "detail": orderResume,
                "price": order.priceTotal
            }
        ],
        "customer": {
            "id": user.idMoip
        },
        "receivers": [
            {
                "type": "SECONDARY",
                "feePayor": false,
                "moipAccount": {
                    "id": locador.idMerchant
                },
                "amount": {
                    "percentual": 80
                }
            }
        ]
    };


    const bithFormatted = `${card.birthdayDate.substring(4, 8)}-${card.birthdayDate.substring(2, 4)}-${card.birthdayDate.substring(0, 2)}`;

    createOrder(orderMoip).then(function (data) {
        order.idOrderMoip = data.id;
        startEditOrder(user.uid, order);

        if (order.idOrderMoip) {
            var payment = {
                "installmentCount": 1,
                "statementDescriptor": "eVolume",
                "fundingInstrument": {
                    "method": "CREDIT_CARD",
                    "creditCard": {
                        "cvc": card.cvv,
                        "id": card.idMoip,
                        "store": false,
                        "holder": {
                            'fullname': card.name,
                            'birthdate': bithFormatted,
                            'taxDocument': {
                                'type': 'CPF',
                                'number': card.document
                            },
                            "billingAddress": {
                                'city': user.billingAddress.city,
                                'district': user.billingAddress.state,
                                'street': user.billingAddress.street,
                                'streetNumber': '0',
                                'zipCode': user.billingAddress.zip,
                                'state': user.billingAddress.state,
                                'country': "BRA"
                            }
                        }
                    }
                }
            };


            createPayment(order.idOrderMoip, payment).then(function (pay) {
                order.idPaymentMoip = pay.id;
                order.status = pay.status;
                startEditOrder(user.uid, order);

                var resumo = {
                    idPagamento: order.idPaymentMoip,
                    idPedido: order.idOrderMoip,
                    descricaoProduto: order.category,
                    dataInicial: order.startDate,
                    dataFinal: order.endDate,
                    qtdDias: order.days,
                    image: order.image,
                    valorUnidade: numeral(order.price).format('0.00'),
                    valorTotal: numeral(order.price * order.days).format('0.00'),
                    locadorNome: locador.firstName + " " + locador.lastName,
                    locadorEmail: locador.email,
                    locadorTelefone: '',
                    locatarioNome: user.firstName + " " + user.lastName,
                    locatarioEmail: user.email,
                    locatarioTelefone: ''
                };
                send(user.firstName, user.email, resumo, 'contratoLocatario');
                send(locador.firstName, locador.email, resumo, 'contratoLocador');
            });


            history.push(`/contrato/${order.idOrderMoip}`);

        }



    });



}

export function makePayment(data) {


    const customer = getInfo(data, data.user_email);
    const locador = getInfo(data, data.order_email);

    var card = {
        name: data.card_name,
        number: data.card_number,
        birthdayDate: data.card_birthdayDate,
        document: data.card_document,
        cvv: data.card_cvv,
        expirationDate: data.card_expirationDate,
        saveCard: data.card_saveCard,
        idMoip: '',
        hash: ''
    };


    // cryptCard(card).then(function(hash){
    //     card.hash = hash;
    // });

    var dataEncrypt =  Encrypt(JSON.stringify(card));//data.card_saveCard ? Encrypt(JSON.stringify(card)) : '';

    var user = {
        uid: customer.uid || customer.id,
        id: customer._id,
        idMoip: '',
        idMerchant: customer.idMerchant || '',
        firstName: data.user_firstName,
        lastName: data.user_lastName,
        rg: data.user_rg,
        cpf: data.user_cpf,
        telefone: data.user_telefone,
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


    const customerMoip = customerMoipExist(data.moip, user.email, user.uid);

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


    if (customerMoip && (customerMoip.ownId === user.uid)) {
        user.idMoip = customerMoip.id
        addCreditCard(user.idMoip, dataCard).then(function (id) {
            //ATUALIZA BASE DE DADOS COM TODOS OS DADOS DO CLIENTE, INCLUSIVE MOIPID
            card.idMoip = id;
            startEditUser(user);
            startOrder(data, card, user, locador);
        });
    }
    else {
        const info = {
            'ownId': user.uid,
            'fullname': user.firstName + ' ' + user.lastName,
            'email': user.email,
            'birthDate': `${user.birthday.substring(4, 8)}-${user.birthday.substring(2, 4)}-${user.birthday.substring(0, 2)}`,
            'taxDocument': {
                'type': 'CPF',
                'number': user.cpf
            },
            "phone": {
                "countryCode": "55",
                "areaCode": user.telefone.substring(0, 2),
                "number": user.telefone
            },
            "shippingAddress": {
                "city": user.address.city,
                "complement": user.address.obs,
                "district": user.address.city,
                "street": user.address.street,
                "streetNumber": "0",
                "zipCode": user.address.zip,
                "state": user.address.state,
                "country": "BRA"
            }
        };

        createCustomer(info).then(function (userMoip) {
            user.idMoip = userMoip.data.id;
            addCreditCard(user.idMoip, dataCard).then(function (id) {
                //ATUALIZA BASE DE DADOS COM TODOS OS DADOS DO CLIENTE, INCLUSIVE MOIPID
                card.idMoip = id;
                startEditUser(user);
                startOrder(data, card, user, locador);
            });
        });



    };










};

