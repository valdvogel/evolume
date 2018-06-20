import React from 'react';
import { Encrypt } from './Cryptografy';

import {send} from '../api/mail/mail';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            data: []
        }
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }))
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        if (!this.state.email) {
            this.setState(() => ({ error: "Por favor, informar o campo email!" }));
            return false;
        }
        else if (!this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.setState(() => ({ error: "Por favor, informar o campo email corretamente!" }));
            return false;
        };
        this.setState(() => ({ error: "E-mail enviado com sucesso! Por favor, verifique seu e-mail." }));

        const id = Encrypt(this.state.email);

        send('',this.state.email,id,'reset');

    };

    componentDidMount = () => {

    };
    render() {
        return (
            <div>
                <section id="main" className="cadastro-wrapper">
                    <div className="inner">
                        <header className="align-center">
                            <h2>Reset de senha</h2>
                        </header>
                        <div className="w3l-main">
                            <div className="w3l-from">
                                <div>
                                    <div className="clear"></div>
                                    <div className="alert alert-warning">
                                        {this.state.error && <p>{this.state.error}</p>}
                                    </div>
                                    <form onSubmit={this.onSubmitForm}>
                                        <div className="w3l-mail">
                                            <label className="head">Email<span className="w3l-star"> * </span></label>
                                            <input onChange={this.onEmailChange}
                                                value={this.state.email} type="email" placeholder="Email"  autoFocus />
                                        </div>
                                        <div className="clear"></div>
                                        <div className="btn">
                                            <input type="submit" name="enviar" value="Enviar" />
                                        </div>
                                        <div className="clear"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default ResetPasswordPage; 
