import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';



const Footer = () => (
    <footer id="myFooter">
        <div className="row">
            <div className="col-sm-3">
                <h5><img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/car-luggage.png" width="23" height="20" /> Acessórios</h5>
                <ul>
                    <li><Link to={`/locatario/suporte bicicleta`}>Suportes Para Bicicletas</Link></li>
                    <li><Link to={`/locatario/rack teto`}>Racks Para Tetos</Link></li>
                    <li><Link to={`/locatario/bagageiros`}>Bagageiros</Link></li>
                    <li><Link to={`/locatario/esportes aquaticos`}>Esportes Aquáticos</Link></li>
                    <li><Link to={`/locatario/esporte inverno`}>Esportes de Inverno</Link></li>
                    <li><Link to={`/locatario/malas bicicletas`}>Malas Para Bicicletas</Link></li>
                    <li><Link to={`/locatario`}>Ver Mais</Link></li>
                </ul>
            </div>
            <div className="col-sm-3">
                <h5><img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/close-envelope.png" width="28" height="20" /> Newsletter</h5>
                <ul>
                    <li><a href="#">Acompanhe nossas novidades, assine nossa newsletter!</a></li>
                    <li>
                        <form>
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
                <div className="politicas">
                    <a href="https://s3.us-east-2.amazonaws.com/evolumebr/TermoUso_2018.pdf" target="_blank">Termos de uso</a> -
                    <a href="https://s3.us-east-2.amazonaws.com/evolumebr/PoliticaPrivacidade_2018.pdf" target="_blank">Política de privacidade</a>
                </div>
            </div>
            <div className="col-sm-3">
                <h5><img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/telephone.png" width="20" height="20" /> Contato</h5>
                <ul>
                    <li><a href="mailto:contato@evolume.com.br">e-mail: contato@evolume.com.br</a></li>
                    <li><a href="#">Tel.: (11) 3224-7890</a></li>
                </ul>
                <div className="social-icons">
                    <a href="https://www.facebook.com/evolumebr" target="_blank" className="facebook"><img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/facebook-logo.png" width="25" height="25" /></a>
                    <a href="https://www.instagram.com/evolumebr" target="_blank" className="instagram"><img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/instagram-logo.png" width="25" height="25" /></a>
                    <a href="https://www.twitter.com/evolumebr" target="_blank" className="twitter"><img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/twitter-logo.png " width="25" height="25" /></a>
                </div>
            </div>
        </div>
    </footer>
);


export default Footer;