import React from 'react';
import { createAccount, createCustomer, addCreditCard, deleteCreditCard, getCustomer, getAllCustomer } from '../api/moip/moip';
import CheckOutForm from './CheckOutForm';


class CheckOutPage extends React.Component {
    render() {
        return (
            <div>
                <section id="main" className="cadastro-wrapper">
                    <CheckOutForm props={this.props}/>
                </section>
            </div>

        )
    }
};

export default CheckOutPage;