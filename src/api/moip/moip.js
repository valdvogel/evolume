import axios from 'axios';


const URL_ROOT = process.env.MOIP_URL_ROOT;

var instance = axios.create({
    auth: {
        username: process.env.MOIP_USERNAME,
        password: process.env.MOIP_PASSWORD
    }
});

var header = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'OAuth ' + process.env.MOIP_AUTH
    }
};


var instanceOAuth = axios.create(header);

export function createPayment(orderId, data) {
    //console.log('pay ', JSON.stringify(data));
    return instanceOAuth.post(`${URL_ROOT}/orders/${orderId}/payments`, data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function createOrder(data) {
    //console.log('order ', JSON.stringify(data));
    return instance.post(`${URL_ROOT}/orders`, data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function getAllCustomer() {
    return instance.get(`${URL_ROOT}/customers`)
        .then(function (response) {
            return response.data.customers;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function getCustomer(customerId) {
    return instance.get(`${URL_ROOT}/customers/${customerId}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}


export function deleteCreditCard(creditcard_id) {
    return instance.delete(`${URL_ROOT}/fundinginstruments/${creditcard_id}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}

export function addCreditCard(customerId, data) {
   // console.log('cartao ', JSON.stringify(data));
    return instance.post(`${URL_ROOT}/customers/${customerId}/fundinginstruments`, data)
        .then(function (response) {
            return response.data.creditCard.id;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
export function createCustomer(data) {
    return instance.post(`${URL_ROOT}/customers`, data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error.message);
        });
}
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