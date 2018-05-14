import React from 'react';
import { connect } from 'react-redux';
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
        let bln = false;

        data.forEach((user) => {
            if (user.email.toUpperCase() === email.toUpperCase()) {
                if ((Decrypt(user.password) === password)) {

                    bln = true;
                    this.props.dispatch(login(user));

                    const json = JSON.stringify(user);
                    localStorage.setItem('user', json);

                    history.push('/locador');
                    window.location.reload();
                }
                else {
                    this.setState(() => ({ error: "A senha informada está incorreta!" }));
                }
            }
            else {
                this.setState(() => ({ error: "O login informado não foi encontrado!" }));
            }
        });

        if (!bln) {
            this.setState(() => ({ error: "Não foram encontradas informações com email e senhas fornecidos." }));
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
            this.setState(() => ({ error: "Por favor, informar o campo password!" }));
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
                        value={this.state.email} type="email" placeholder="Email"  required="" autoFocus />
                    </div>
                    <div className="w3l-user">
                        <label className="head">Senha<span className="w3l-star"> * </span></label>
                        <input onChange={this.onPasswordChange} value={this.state.password} type="password" placeholder="Senha" required="" />
                    </div>
                    <div className="w3l-user">
                        <a href='#'>Esqueci minha senha!</a>
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
