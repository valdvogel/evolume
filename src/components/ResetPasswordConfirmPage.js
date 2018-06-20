import React from 'react';
import {setNewPassword} from '../actions/user';
import {send} from '../api/mail/mail';
import { history } from '../routes/AppRouter';
import { Encrypt , Decrypt } from './Cryptografy';
import database from '../firebase/firebase';

class ResetPasswordConfirmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            data: []
        }
    };
    onPasswordChange = (e) => {
        const value = e.target.value;
        this.setState({ password: value });
    };
    onConfirmPasswordChange = (e) => {
        const value = e.target.value;
        this.setState({ confirmPassword: value });
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (!this.state.password) {
            this.setState(() => ({ error: "Por favor, informar o campo Nova Senha!" }));
            return false;
        }
        else if (!this.state.confirmPassword) {
            this.setState(() => ({ error: "Por favor, informar o campo Confirmar Nova Senha!" }));
            return false;
        }else if (this.state.password != this.state.confirmPassword) {
            this.setState(() => ({ error: "Por favor, informar o campo Confirmar Nova Senha com mesmo valor do campo Nova Senha !" }));
            return false;
        };
        const data = this.state.data;
        const email = this.state.email;
        data.forEach((user) => {
            if (user.email.toUpperCase() === email.toUpperCase()) {
                const password = Encrypt(this.state.password);
                setNewPassword(user, password);
                send(user.firstName,this.state.email,'','resetConfirm');
                this.setState(() => ({ error: "Senha atualizada com sucesso!" }));
                setTimeout(() => {
                    history.push('/login');
                  }, 2000);
            };  
        });
    };

    componentDidMount = () => {
        var email = Decrypt(this.props.location.search.replace('?id=', ''));
        var data = [];
        database.ref(`users`)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    database.ref(`users/${child.key}/data`)
                        .once('value')
                        .then((snap) => {
                            snap.forEach((user) => {
                                data.push({
                                    _id: user.key,
                                    ...user.val()
                                });

                            });
                        });
                });
            });

        this.setState({
            email: email,
            data: data
        });
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
                                        <div className="w3l-user">
                                            <label className="head">Nova Senha<span className="w3l-star"> * </span></label>
                                            <input onChange={this.onPasswordChange}
                                                value={this.state.password} type="password" placeholder="Nova Senha" required="" />
                                        </div>
                                        <div className="clear"></div>
                                        <div className="w3l-user">
                                            <label className="head">Confirmar Nova Senha<span className="w3l-star"> * </span></label>
                                            <input onChange={this.onConfirmPasswordChange}
                                                value={this.state.confirmPassword} type="password" placeholder="Confirmar Nova Senha" required="" />
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

export default ResetPasswordConfirmPage; 
