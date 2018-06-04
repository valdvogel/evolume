import axios from 'axios';

const URL_ROOT = 'https://sandbox.moip.com.br/v2';
const URL_CUSTOMER = URL_ROOT+'/customers/';
const URL_CARD = URL_ROOT+'/fundinginstruments/';
const URL_ACCOUNT = URL_ROOT+'/accounts';
const URL_CHANNEL = URL_ROOT+ '/channels';


var instance = axios.create({
    auth: {
        username: '9ARLQVOP1ZAXAWONYHPRBMVSVBJ6X1J1',
        password: 'WZD6EX7FFB8CK8QX5GZHVMWKJ48ARGH7IZ5EGFMI'
    }
});

export function createPayment(orderId,data) {
  const payload = {
    id:'123',
    status: 'AUTHORIZED'

  };
  return payload;
  // return instance.post(`https://sandbox.moip.com.br/v2/orders/${orderId}/payments`, data)
  //     .then(function (response) {
  //         return response.data
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //         throw new Error(error.message);
  //     });
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

export function addCreditCard(customerId,data) {
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
              'type' : 'RG',
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

