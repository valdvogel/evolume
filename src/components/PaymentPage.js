import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = () => (
    <div>
        Payment PaymentPage

        Ver informacoes de pagamento do MOIP

        <Link to={`/contract`}>
            Pagamento
        </Link>
    </div>

);

export default PaymentPage;