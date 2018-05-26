import React from 'react';
import moip from '../moip/moip';


class CheckoutPage extends React.Component {

    componentDidMount = () => {
        console.log(moip);
    };
    render() {
        return (
            <div>
                Service Page
            </div>

        )
    }
};

export default CheckoutPage;