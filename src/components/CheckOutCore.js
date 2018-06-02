import database from '../firebase/firebase';
import moment from 'moment';
import { startEditUser } from '../actions/user';
import { startAddOrder } from '../actions/order';
import { Encrypt, Decrypt } from './Cryptografy';
import { createCustomer } from '../api/moip/moip';



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

export function makePayment(data) {

    const customer = getInfo(data);

    var card = {
        name: data.card_name,
        number: data.card_number,
        birthdayDate: data.card_birthdayDate,
        cpf: data.card_cpf,
        cvv: data.card_cvv,
        expirationDate: data.card_expirationDate,
        saveCard: data.card_saveCard
    };



    var dataEncrypt = data.card_saveCard ? Encrypt(JSON.stringify(card)) : '';

    var user = {
        uid: customer.uid,
        id: customer._id,
        firstName: data.user_firstName,
        lastName: data.user_firstName,
        rg: data.user_rg,
        cpf: data.user_cpf,
        email: data.user_email,
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

    //ATUALIZA BASE DE DADOS
    startEditUser(user);

    var order = {
        id: '',
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
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss.ms')
    }


    //GRAVA PEDIDO NA BASE DE DADO
    var orderId = startAddOrder(user, order);
    order.id = orderId;

    const info = {
        'ownId': user.uid,
        'fullname': user.firstName + ' ' + user.lastName,
        'email': user.email,
        'birthDate': '1984-11-14',
        'taxDocument': {
            'type': 'CPF',
            'number': user.cpf
        }
    };

    console.log(info);
    const customerMoipId = createCustomer(info);

    console.log(customerMoipId.id);













};

