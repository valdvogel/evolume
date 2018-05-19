import React from 'react';

const Footer = () => (
    <footer id="myFooter">
        <div className="row">
            <div className="col-sm-3">
                <h5><img src="./images/car-luggage.png" width="23" height="20" /> Produtos</h5>
                <ul>
                    <li><a href="#">Racks</a></li>
                    <li><a href="#">Suporte para Bicicletas</a></li>
                    <li><a href="#">Bagageiros</a></li>
                    <li><a href="#">Cadeiras Infantis</a></li>
                    <li><a href="#">Bolsas</a></li>
                    <li><a href="#">Ver Mais</a></li>
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
                    Copyright © 2018 Evolume - Todos os direitos reservados
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