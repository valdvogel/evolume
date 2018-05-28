import React from 'react';
import { createAccount, createCustomer, addCreditCard, deleteCreditCard, getCustomer, getAllCustomer } from '../api/moip/moip';
import CheckOutForm from './CheckOutForm';


class CheckoutPage extends React.Component {

    componentDidMount = () => {

        // getAllCustomer().then(function (response) {
        //     console.log(response);
        // }).catch(function (e) {
        //     console.log('erro', e);
        // });
    };
    render() {
        return (
            <div>
                <section id="main" className="cadastro-wrapper">
                    <CheckOutForm/>
                </section>
            </div>

        )
    }
};

export default CheckoutPage;