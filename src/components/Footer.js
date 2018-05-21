import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';



const Footer = () => (
    <footer id="myFooter">
        <div className="row">
            <div className="col-sm-3">
                <h5><img src="./images/car-luggage.png" width="23" height="20" /> Acessórios</h5>
                <ul>
                    <li><Link to={`/locador/suporte bicicleta`}>Suportes Para Bicicletas</Link></li>
                    <li><Link to={`/locador/rack teto`}>Racks Para Tetos</Link></li>
                    <li><Link to={`/locador/rack para caminhao e van`}>Rack para caminhão</Link></li>
                    <li><Link to={`/locador/bagageiros`}>Bagageiros</Link></li>
                    <li><Link to={`/locador/esportes aquaticos`}>Esportes Aquáticos</Link></li>
                    <li><Link to={`/locador/esporte de inverno`}>Esportes de Inverno</Link></li>
                    <li><Link to={`/locador/malas bicicletas`}>Malas Para Bicicletas</Link></li>
                    <li><Link to={`/locador/cadeiras infantis`}>Cadeiras Infantis</Link></li>
                    <li><Link to={`/locador/bolsas`}>Bolsas</Link></li>
                    <li><Link to={`/locador`}>Ver Mais</Link></li>
                </ul>
            </div>
            <div className="col-sm-3">
                <h5><img src="./images/close-envelope.png" width="28" height="20" /> Newsletter</h5>
                <ul>
                    <li><a href="#">Acompanhe nossas novidades, assine nossa newsletter!</a></li>
                    <li>
                        <form method="post" action="#">
                            <div className="cadbusca0">
                                <div className="cadbusca1">
                                    <input type="text" name="query" id="query" value="" placeholder="Insira seu e-mail" />
                                </div>
                                <div className="cadbusca2">
                                    <input type="submit" value="Cadastrar" className="fit" />
                                </div>
                            </div>
                        </form>
                    </li>
                </ul>
                <div className="copyright">
                    Copyright © {moment().format('YYYY')} Evolume - Todos os direitos reservados
                        </div>
            </div>
            <div className="col-sm-3">
                <h5><img src="./images/telephone.png" width="20" height="20" /> Contato</h5>
                <ul>
                    <li><a href="#">e-mail: contato@evolume.com.br</a></li>
                    <li><a href="#">Tel.: (11) 3224-7890</a></li>
                </ul>
                <div className="social-icons">
                    <a href="#" className="facebook"><img src="./images/facebook-logo.png" width="25" height="25" /></a>
                    <a href="#" className="instagram"><img src="./images/instagram-logo.png" width="25" height="25" /></a>
                    <a href="#" className="twitter"><img src="./images/twitter-logo.png" width="25" height="25" /></a>
                </div>
            </div>
        </div>
    </footer>
);


export default Footer;