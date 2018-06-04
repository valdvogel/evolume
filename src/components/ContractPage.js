import React from 'react';
import { Link } from 'react-router-dom';


class ContractPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: ''
        };
    };
    componentDidMount = () => {

        this.setState({
            order: this.props.match.params.id
        });
        
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
                    <h3>O seu equipamento está reservado, por favor verifique seu email para maiores informações.</h3>
                </header>
                <p className="align-center">
                    Seu número de pedido é <strong>{this.state.order}</strong>.
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


export default ContractPage;