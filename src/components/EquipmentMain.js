import React from 'react';
import { Link } from 'react-router-dom';

const EquipmentMain = () => (
    <section id="two" className="wrapper style1 special">
        <div className="inner">
            <header>
                <h2>Acessórios</h2>
            </header>
            <div className="box alt">
                <div className="flex flex 2">
                    <div className="4u">
                        <div className="articleheader">
                            <Link to={`/locatario/suporte bicicleta`}>
                            Suportes Para Bicicletas
                            </Link>
                        </div>
                        <p className="rowarticle1">
                            <Link to={`/locatario/suporte bicicleta`}>
                                <img src="./images/icone_suporte_bicicleta.png" width="77" height="80" />
                            </Link>
                        </p>
                        <p className="rowarticle2">
                            Encontre o melhor suporte de bicicleta para atender às suas necessidades. Aqui está uma seleção completa dos melhores suporte de bicicleta do mundo para o seu carro.
                        </p>
                    </div>
                    <div className="4u">
                        <div className="articleheader">
                            <Link to={`/locatario/rack teto`}>
                                Racks Para Tetos
                            </Link>
                        </div>
                        <p className="rowarticle1">
                            <Link to={`/locatario/rack teto`}>
                                <img src="./images/icone_rack_teto.png" width="77" height="80" />
                            </Link>
                        </p>
                        <p className="rowarticle2">
                            Possuimos uma grande variedade de racks para tetos de carro. Caixas de carga, cestas e bolsas; encontre o melhor rack de carga para suas necessidades.
                        </p>
                    </div>
                    <div className="4u">
                        <div className="articleheader">
                            <Link to={`/locatario/bagageiro`}>
                                Bagageiros
                            </Link>
                        </div>
                        <p className="rowarticle1">
                            <Link to={`/locatario/bagageiro`}>
                                <img src="./images/icone_bagageiro_2.png" width="77" height="80" />
                            </Link>
                        </p>
                        <p className="rowarticle2">
                            Encontre o melhor bagageiro que se adequa ao seu carro. As melhores marcas do mundo. Venha e veja porque somos os melhores.
                        </p>
                    </div>
                    <div className="4u">
                        <div className="articleheader">
                            <Link to={`/locatario/esportes aquaticos`}>
                                Suportes Para Equipamentos de Esportes Aquáticos
                            </Link>
                        </div>
                        <p className="rowarticle1">
                            <Link to={`/locatario/esportes aquaticos`}>
                                <img src="./images/icone_esportes_aquatico_2.png" width="77" height="80" />
                            </Link>
                        </p>
                        <p className="rowarticle2">
                            Racks para Prancha de surf e Stand-Up-Paddle são a melhor maneira de levar suas pranchas à água sem ter que se preocupar.
                            Dê uma olhada nos nossos racks de pranchas de surf e faça seu bate-volta sem dor de cabeça.    
                        </p>
                    </div>
                    <div className="4u">
                        <div className="articleheader">
                            <Link to={`/locatario/esporte inverno`}>
                                Suportes Para Equipamentos de Esportes de Inverno
                            </Link>
                        </div>
                        <p className="rowarticle1">
                            <Link to={`/locatario/esporte inverno`}>
                                <img src="./images/icone_esportes_inverno_2.png" width="77" height="80" />
                            </Link>
                        </p>
                        <p className="rowarticle2">
                            Oferemos uma variedade de racks para esqui e snowboard para parte traseira e teto do seu carro. Venha ver as nossas opções, sempre com os melhores preços online.
                        </p>
                    </div>
                    <div className="4u">
                        <div className="articleheader2">
                            <Link to={`/locatario/malas bicicletas`}>
                                Malas Para Bicicletas
                            </Link>
                        </div>
                        <p className="rowarticle1">
                            <Link to={`/locatario/malas bicicletas`}>
                                <img src="./images/icone_malas_bicicletas.png" width="77" height="80" />
                            </Link>
                        </p>
                        <p className="rowarticle2">
                            Um case de viagem de bicicleta transporta sua bicicleta com segurança, cuidado e sem complicações. Cada mala de bicicleta é resistente por fora e inteligente por dentro. Escolha já a sua.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>


);

export default EquipmentMain;