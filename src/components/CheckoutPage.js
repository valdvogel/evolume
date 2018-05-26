import React from 'react';
import  {getApp} from '../api/moip/moip';



class CheckoutPage extends React.Component {

    componentDidMount = () => {

        // getApp().then(function (response) {
        //     console.log(response);
        // }).catch(function (e) {
        //     console.log('erro', e);
        // });
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