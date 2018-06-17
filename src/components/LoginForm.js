import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { history } from '../routes/AppRouter'
import database from '../firebase/firebase';
import { login } from '../actions/auth';
import { Decrypt } from './Cryptografy';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            data: []
        }
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }))
    };
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }))
    };
    getUser = (email, password) => {
        const e = email;
        const p = password;

        const data = this.state.data;
        var bln = false;
        var error = '';

        data.forEach((user) => {
            if (user.email.toUpperCase() === email.toUpperCase()) {
                if ((Decrypt(user.password) === password)) {
                    if (user.active) {

                        bln = true;
                        this.props.dispatch(login(user));

                        const json = JSON.stringify(user);
                        localStorage.setItem('user', json);

                        history.push('/locatario');
                        window.location.reload();
                    } else {
                        error = "A conta não está autorizada!";
                    }
                }
                else {
                    error = "A senha informada está incorreta!";
                }
            }
        });

        if (!bln) {

            this.setState(() => ({ error: error === '' ? "Não foram encontradas informações com email e senhas fornecidos." : error }));
            this.setState(() => ({ password: '' }));
        }

    };
    onSubmitForm = (e) => {
        e.preventDefault();

        if (!this.state.email) {
            this.setState(() => ({ error: "Por favor, informar o campo email!" }));
            return false;
        }
        else if (!this.state.password) {
            this.setState(() => ({ error: "Por favor, informar o campo senha!" }));
            return false;
        };
        const email = this.state.email;
        const password = this.state.password;
        this.getUser(email, password);
    };

    componentDidMount = () => {
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
        this.setState({ data: data });
    };


    render() {
        return (
            <div>
                <div className="clear"></div>

                <div className="alert alert-warning">
                    {this.state.error && <p>{this.state.error}</p>}
                </div>

                <form onSubmit={this.onSubmitForm}>
                    <div className="w3l-mail">
                        <label className="head">Email<span className="w3l-star"> * </span></label>
                        <input onChange={this.onEmailChange}
                            value={this.state.email} type="email" placeholder="Email" required="" autoFocus />
                    </div>
                    <div className="w3l-user">
                        <label className="head">Senha<span className="w3l-star"> * </span></label>
                        <input onChange={this.onPasswordChange} value={this.state.password} type="password" placeholder="Senha" required="" />
                    </div>
                    <div className="w3l-user">
                        <Link to='/reset'>Esqueci minha senha!</Link>
                    </div>
                    <div className="clear"></div>
                    <div className="btn">
                        <input type="submit" name="enviar" value="Enviar" />
                    </div>
                    <div className="clear"></div>
                </form>
            </div>
        )
    }
}

export default connect()(LoginForm); 
