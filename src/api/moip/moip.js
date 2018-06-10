import axios from 'axios';
//import { MoipCreditCard } from 'moip-sdk-js'
//import JSEncrypt from 'node-jsencrypt'


const URL_ROOT = 'https://sandbox.moip.com.br/v2';
const URL_CUSTOMER = URL_ROOT + '/customers/';
const URL_CARD = URL_ROOT + '/fundinginstruments/';
const URL_ACCOUNT = URL_ROOT + '/accounts';
const URL_CHANNEL = URL_ROOT + '/channels';


export function cryptCard(data) {

    // const pubKey = `-----BEGIN PUBLIC KEY-----
    //                 MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnvXokRh87onqV/XtG6xy
    //                 YyYLB4ukBH5///QQn8x4xgoCjKi4Z4yT8iGVRp+hKWzm0ToYA4qc7u33MPxzs4C4
    //                 XJ7ClQjVTmZj4Pkx+/1DSZLz3wyHJ5ANc0ewdVBEhYGRzKyWi51GvGVBXvojtxKJ
    //                 AlVuYlNTD4IvnxUDFu102f1U38sfa8018Ok8XJ7hPg3bCDJChDUfCZaE9ySz4h2S
    //                 LbN4SlL7/C2d1FtPuVZrEEK4g3pvFNoSB+fbCOt+RGYFC4YNuKhKocT+7DQ3hjDj
    //                 b8Vs0t5hk43SonXVBx0OC5ik/qU3Ax3s3y0YpI4dKuMr5kiU2+57PWWbxieaxhRM
    //                 QQIDAQAB
    //                 -----END PUBLIC KEY-----
    //                 `;

    // return MoipCreditCard
    //     .setEncrypter(JSEncrypt, 'node')
    //     .setPubKey(pubKey)
    //     .setCreditCard({
    //         number: data.number,
    //         cvc: data.cvv,
    //         expirationMonth: data.expirationDate.substring(0, 2),
    //         expirationYear: data.expirationDate.substring(2, 4),
    //     })
    //     .hash()
    //     .then(function (hash) {
    //         return hash;
    //     });
    return 'fake';


}
var instance = axios.create({
    auth: {
        username: '9ARLQVOP1ZAXAWONYHPRBMVSVBJ6X1J1',
        password: 'WZD6EX7FFB8CK8QX5GZHVMWKJ48ARGH7IZ5EGFMI'
    }
});

var instanceOAuth = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'OAuth a80ae6bbcdc544a2bff53e5c8b16d384_v2'
    }
});

export function createPayment(orderId, data) {
    return instanceOAuth.post(`https://sandbox.moip.com.br/v2/orders/${orderId}/payments`, data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function createOrder(data) {
    return instance.post(`https://sandbox.moip.com.br/v2/orders`, data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function getAllCustomer() {
    return instance.get(`https://sandbox.moip.com.br/v2/customers/`)
        .then(function (response) {
            //console.log(response.data.customers);
            return response.data.customers;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function getCustomer(customerId) {
    return instance.get(`https://sandbox.moip.com.br/v2/customers/${customerId}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}


export function deleteCreditCard(creditcard_id) {
    return instance.delete(`https://sandbox.moip.com.br/v2/fundinginstruments/${creditcard_id}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}

export function addCreditCard(customerId, data) {
    return instance.post(`https://sandbox.moip.com.br/v2/customers/${customerId}/fundinginstruments`, data)
        .then(function (response) {
            return response.data.creditCard.id;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function createCustomer(data) {

    return instance.post('https://sandbox.moip.com.br/v2/customers', data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}

export function createAccount() {
    const data = {
        'email': {
            'address': 'jose@evolume.com.br'
        },
        'person': {
            'name': 'Jose',
            'lastName': 'Valdvogel',
            'taxDocument': {
                'type': 'CPF',
                'number': '336.714.878-44'
            },
            'identityDocument': {
                'type': 'RG',
                'number': '348141257',
                'issuer': 'SSP',
                'issueDate': '2012-02-18'
            },
            'birthDate': '1984-11-14',
            'phone': {
                'countryCode': '55',
                'areaCode': '11',
                'number': '993904792'
            },
            'address': {
                'street': 'Av. Brigadeiro Faria Lima',
                'streetNumber': '2927',
                'district': 'Itaim',
                'zipCode': '01234-000',
                'city': 'São Paulo',
                'state': 'SP',
                'country': 'BRA'
            }
        },
        'type': 'MERCHANT',
        'transparentAccount': true
    };
    return instance.post('https://sandbox.moip.com.br/v2/accounts', data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}

export function createApp() {
    const data = {
        'name': 'evolumebr-dev',
        'description': 'evolume - aluguel de acessórios para carros',
        'site': 'http://www.evolume.com.br',
        'redirectUri': 'http://www.evolume.com.br/redirect'
    };
    return instance.post('https://sandbox.moip.com.br/v2/channels', data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });

}

