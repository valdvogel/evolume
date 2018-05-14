import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


const RentPage =(props)=>{

    //console.log(props);

    return(
        <div>
            Produto para aluguel {props.match.params.id}
            <br/>
            <Link to={`/payment`}>
                Pagamento   
            </Link>
        </div>
    );
};

export default RentPage;