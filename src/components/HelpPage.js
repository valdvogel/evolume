import React from 'react';
import ReactDOM from 'react-dom';

const HelpPage = () => (
    <div>
        <section id="main" className="cadastro-wrapper">
            <div className="inner">
                <header className="align-center">
                    <h2>Ajuda</h2>
                </header>
                <header className="align-center">
                    <h3>O que é o Evolume?</h3>
                </header>
                <p align="justify">
                    Um conjunto de serviços voltados para a sua casa, o seu carro e a sua conveniência.
                    Qualquer pessoa, segurado da Porto Seguro ou não, poderá contratar um ou vários serviços em qualquer horário. O atendimento abrange desde solicitações de emergência, como remoção por guincho, desentupimento e chaveiro, até outros serviços que possam atender as mais diferentes necessidades.</p>

                <header className="align-center">
                    <h3>Serviços para o seu carro</h3>
                </header>
                <p align="justify">
                    O atendimento compreende serviços de guincho para ocasiões especiais, para levar e trazer o veículo da revisão ou de um ponto a outro determinado pelo cliente. Há também serviços de chaveiro e de envio de técnico para socorro em caso de quebra do automóvel.</p>

            </div>
        </section>
    </div>
);

export default HelpPage;