import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ()=>(
    <div>
        <section id="main" className="cadastro-wrapper">
            <div className="inner">
                <header className="align-center">
                    <h2><strong>Algo estranho aconteceu! :-(</strong></h2>
                </header>
                <header className="align-center">
                    <h3>Ocorreu um comportamento anormal em nossos sistemas. Desculpe-nos!</h3>
                </header>
                <hr />
                <p className="align-center">
                    Por favor, relate o problema caso seja urgente através desse <a href="mailto:contato@evolume.com.br">email</a>. Caso não seja, iremos ajustá-lo o quanto antes.
                </p>
                <p className="align-center">
                    <Link className="align-center" to={'/'}>Voltar para página inicial</Link>
                </p>
                
                
            </div>
        </section>
    </div>
);

export default ErrorPage;