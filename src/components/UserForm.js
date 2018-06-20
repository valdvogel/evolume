import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routes/AppRouter'
import database from '../firebase/firebase';
import { startAddUser } from '../actions/user';
import { Encrypt } from './Cryptografy';
import {send} from '../api/mail/mail';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            terms: false,
            data: [],
            error: ''
        }
    };
    onFirstNameChange = (e) => {
        const firstName = e.target.value;
        this.setState(() => ({ firstName }))
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }))
    };
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }))
    };
    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({ lastName }))
    };
    onTermsChange = (e) => {
        const terms = !this.state.terms;
        this.setState(() => ({ terms }))
    };
    getUser = (email) => {
        const e = email;
        let bln = true;
        const data = this.state.data;

        // verifica se existe algum usuário com mesmo email.
        data.forEach((user) => {
            if (user.email.toUpperCase() === e.toUpperCase()) {
                this.setState(() => ({ error: "Esse email já está cadastrado!" }));
                bln = false;
            }
        });
        return bln;
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if (!this.state.firstName) {
            this.setState(() => ({ error: "Por favor, informar o campo nome!" }));
            return false;

        }
        else if (!this.state.lastName) {
            this.setState(() => ({ error: "Por favor, informar o campo sobrenome!" }));
            return false;
        }
        else if (!this.state.email) {
            this.setState(() => ({ error: "Por favor, informar o campo email!" }));
            return false;
        }
        else if (!this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.setState(() => ({ error: "Por favor, informar o campo email corretamente!" }));
            return false;
        }
        else if (!this.state.password) {
            this.setState(() => ({ error: "Por favor, informar o campo senha!" }));
            return false;
        }
        else if (!this.state.terms) {
            this.setState(() => ({ error: "Por favor, acertar os termos de uso!" }));
            return false;
        }

        const pass = Encrypt(this.state.password);

        if (this.getUser(this.state.email)) {
            this.props.dispatch(startAddUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: pass,
                terms: this.state.terms,
                active: false
            }, 'evolume.com.br'
            ));

            const id = Encrypt(this.state.email);

            send(this.state.firstName,this.state.email,id,'cadastro');
            history.push('/sucesso');
        }



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
                <div>
                    {this.state.error && <p>{this.state.error}</p>}
                </div>
                <form onSubmit={this.onSubmitForm}>
                    <div className="w3l-num">
                        <label className="head">Nome<span className="w3l-star"> * </span></label>
                        <input onChange={this.onFirstNameChange}
                            value={this.state.firstName} type="text" placeholder="Nome" autoFocus required="" />

                    </div>
                    <div className="w3l-sym">
                        <label className="head">Sobrenome<span className="w3l-star"> * </span></label>
                        <input onChange={this.onLastNameChange}
                            value={this.state.lastName} type="text" placeholder="Sobrenome" required="" />
                    </div>
                    <div className="w3l-mail">
                        <label className="head">Email<span className="w3l-star"> * </span></label>
                        <input onChange={this.onEmailChange}
                            value={this.state.Email} type="email" placeholder="Email" required="" />

                    </div>
                    <div className="w3l-user">
                        <label className="head">Senha<span className="w3l-star"> * </span></label>
                        <input onChange={this.onPasswordChange}
                            value={this.state.password} type="password" placeholder="Senha" required="" />
                    </div>
                    <div className="aceite">
                        <div className="botaoaceite" >
                            <input type="checkbox" id="human" name="human" checked={this.state.terms} onChange={this.onTermsChange}
                                value={this.state.terms} />
                        </div>
                        <label htmlFor="human">Estou de acordo com os <a href="https://s3.us-east-2.amazonaws.com/evolumebr/TermoUso_2018.pdf" target="_blank">termos de uso.</a></label>

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

export default connect()(UserForm); 
