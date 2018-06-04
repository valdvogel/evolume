import React from 'react';
import { Link } from 'react-router-dom';

const SucessPage = (props) => (
    <div>
        <section id="main" className="cadastro-wrapper">
            <div className="inner">
                <header className="align-center">
                    <h2>Obrigado!</h2>
                </header>
                <header className="align-center">
                    <h3>Cadastro realizado com sucesso, por favor verifique seu email para confirmação dos seus dados.</h3>
                </header>
                <hr />
                <p className="align-center">
                    Algum problema ? <a href="mailto:contato@evolume.com.br">Entre em contato!</a>
                </p>
                <p className="align-center">
                    <Link className="align-center" to={'/'}>Voltar para página inicial</Link>
                </p>
                
                
            </div>
        </section>
    </div>
);

export default SucessPage;