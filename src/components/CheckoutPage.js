import React from 'react';
import { createAccount, createCustomer, addCreditCard, deleteCreditCard, getCustomer, getAllCustomer } from '../api/moip/moip';
import CheckOutForm from './CheckOutForm';


class CheckOutPage extends React.Component {

    componentDidMount = () => {

        console.log(this.props);
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

export default CheckOutPage;