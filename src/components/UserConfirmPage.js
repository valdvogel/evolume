import React from 'react';
import { Link } from 'react-router-dom';
import { setEmailConfirmation } from '../actions/user';
import { Decrypt } from './Cryptografy';



class UserConfirmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    };
    componentDidMount = () => {
        var dados = Decrypt(this.props.location.search.replace('?id=',''));
        setEmailConfirmation(dados);
    };
    render() {
        return (
            <div>
                <section id="main" className="cadastro-wrapper">
                    <div className="inner">
                        <header className="align-center">
                            <h2><strong>Obrigado!</strong></h2>
                        </header>
                        <header className="align-center">
                            <h3>Seu cadastro está confirmado.</h3>
                        </header>
                        <p className="align-center">
                            A partir de agora você terá acesso a todos os equipamentos disponíveis na plataforma.
                        </p>
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


export default UserConfirmPage;