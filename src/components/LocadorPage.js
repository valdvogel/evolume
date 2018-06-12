import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';

class LocadorPage extends React.Component {
    componentDidMount = () => {

    };
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <section id="main" className="cadastro-wrapper">
                    <div className="inner">
                        <header className="align-center">
                            <h2><strong>Quer colocar um equipamento para aluguel ?</strong></h2>
                        </header>
                        <header className="align-center">
                            <h3>Entre em contato conosco através do email de <a href="mailto:contato@evolume.com.br">contato</a> com informações do seu equipamento.</h3>
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

        )

    }
}

export default LocadorPage;
