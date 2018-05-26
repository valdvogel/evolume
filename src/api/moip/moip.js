import axios from 'axios';

var instance = axios.create({
    auth: {
        username: '9ARLQVOP1ZAXAWONYHPRBMVSVBJ6X1J1',
        password: 'WZD6EX7FFB8CK8QX5GZHVMWKJ48ARGH7IZ5EGFMI'
    }
});

export function getApp() {
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

export function createOrderAndCustomer() {
    const data = {
        'id': 'ORD-A2GRK4CHWOUS',
        'ownId': 'id_pedido',
        'status': 'CREATED',
        'platform': 'V2',
        'createdAt': '2018-05-25T22:31:01.689-03',
        'updatedAt': '2018-05-25T22:31:01.689-03',
        'amount': {
          'paid': 0,
          'total': 13000,
          'fees': 0,
          'refunds': 0,
          'liquid': 0,
          'otherReceivers': 0,
          'currency': 'BRL',
          'subtotals': {
            'shipping': 1000,
            'addition': 0,
            'discount': 0,
            'items': 12000
          }
        },
        'items': [
          {
            'product': 'Descrição do pedido',
            'detail': 'Mais info...',
            'price': 12000,
            'quantity': 1,
            'category': 'CLOTHING'
          }
        ],
        'customer': {
          'id': 'CUS-LPA18TKT908S',
          'ownId': 'id_cliente',
          'fullname': 'Eduardo Garcia',
          'createdAt': '2018-05-25T22:27:50.000-03',
          'updatedAt': '2018-05-25T22:31:01.695-03',
          'birthDate': '1988-12-30',
          'email': 'eduardo@email.com',
          'phone': {
            'countryCode': '55',
            'areaCode': '11',
            'number': '22355576'
          },
          'taxDocument': {
            'type': 'CPF',
            'number': '59929091092'
          },
          'shippingAddress': {
            'zipCode': '01244500',
            'street': 'Avenida 23 de Maio',
            'streetNumber': '654',
            'complement': '12',
            'city': 'Sao Paulo',
            'district': 'Centro',
            'state': 'SP',
            'country': 'BRA'
          },
          '_links': {
            'self': {
              'href': 'https://sandbox.moip.com.br/v2/customers/CUS-LPA18TKT908S'
            },
            'hostedAccount': {
              'redirectHref': 'https://hostedaccount-sandbox.moip.com.br?token=d4054dc0-6e51-4786-9e08-0316862c6185&id=CUS-LPA18TKT908S&mpa=MPA-F85E76D0D0B8'
            }
          }
        },
        'payments': [],
        'escrows': [],
        'refunds': [],
        'entries': [],
        'events': [
          {
            'type': 'ORDER.CREATED',
            'createdAt': '2018-05-25T22:31:01.689-03',
            'description': ''
          }
        ],
        'receivers': [
          {
            'moipAccount': {
              'id': 'MPA-F85E76D0D0B8',
              'login': 'jose@evolume.com.br',
              'fullname': 'JCL TECNOLOGIA E INOVAÇÃO LTDA'
            },
            'type': 'PRIMARY',
            'amount': {
              'total': 9100,
              'currency': 'BRL',
              'fees': 0,
              'refunds': 0
            },
            'feePayor': false
          },
          {
            'moipAccount': {
              'id': 'MPA-E3C8493A06AE',
              'login': 'marcos150895@gmail.com',
              'fullname': 'Marcos Santana Santos'
            },
            'type': 'SECONDARY',
            'amount': {
              'total': 3900,
              'currency': 'BRL',
              'fees': 0,
              'refunds': 0
            },
            'feePayor': true
          }
        ],
        'shippingAddress': {
          'zipCode': '01244500',
          'street': 'Avenida 23 de Maio',
          'streetNumber': '654',
          'complement': '12',
          'city': 'Sao Paulo',
          'district': 'Centro',
          'state': 'SP',
          'country': 'BRA'
        },
        '_links': {
          'self': {
            'href': 'https://sandbox.moip.com.br/v2/orders/ORD-A2GRK4CHWOUS'
          },
          'checkout': {
            'payCheckout': {
              'redirectHref': 'https://checkout-new-sandbox.moip.com.br?token=d8754e86-0432-41f1-90c6-ec601ddcde4d&id=ORD-A2GRK4CHWOUS'
            },
            'payCreditCard': {
              'redirectHref': 'https://checkout-new-sandbox.moip.com.br?token=d8754e86-0432-41f1-90c6-ec601ddcde4d&id=ORD-A2GRK4CHWOUS&payment-method=credit-card'
            },
            'payBoleto': {
              'redirectHref': 'https://checkout-new-sandbox.moip.com.br?token=d8754e86-0432-41f1-90c6-ec601ddcde4d&id=ORD-A2GRK4CHWOUS&payment-method=boleto'
            },
            'payOnlineBankDebitItau': {
              'redirectHref': 'https://checkout-sandbox.moip.com.br/debit/itau/ORD-A2GRK4CHWOUS'
            }
          }
        }
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