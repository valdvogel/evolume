import React from 'react';

const ProcessMain = () => (
    <section id="one" className="wrapper">
        <div className="inner">
            <div className="flex flex-3">
                <article>
                    <div className="rowencontre">
                        <header>
                            <h3>Encontre</h3>
                        </header>
                        <p>Encontre o acessório mais próximo a sua localização de acordo com seu carro e necessidade.</p>
                    </div>
                    <div className="icone_encontre">
                        <img src="./images/magnifier.png" width="40px" height="40px"/>
                    </div>
                </article>
                <article>
                    <div className="rowcontrate">
                        <header>
                            <h3>Contrate</h3>
                        </header>
                        <p>Contrate o acessório escolhido com segurança e conforto.</p>
                    </div>
                    <div className="icone_contrate">
                        <img src="./images/hand_shake.png" width="49px" height="40px"/>
                    </div>
                </article>
                <article>
                    <div className="rowuse">
                        <header>
                            <h3>Use</h3>
                        </header>
                        <p>Use o acessório para o que deseja. Passear, viajar, pedalar... Agora é pé na estrada!</p>
                    </div>
                    <div className="icone_use">
                        <img src="./images/jeep.png" width="55px" height="40px"/>
                    </div>

                </article>
            </div>
        </div>
    </section>

);

export default ProcessMain;

