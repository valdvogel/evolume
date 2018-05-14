import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routes/AppRouter'
import { startAddUser } from '../actions/user';
import { Encrypt } from './Cryptografy';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
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


        const pass = Encrypt(this.state.password);

        this.props.dispatch(startAddUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: pass
        }
        ));

        history.push('/sucess');


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
                        value={this.state.firstName} type="text" placeholder="Nome" autoFocus  required=""/>

                    </div>
                    <div className="w3l-sym">
                        <label className="head">Sobenome<span className="w3l-star"> * </span></label>
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
                        value={this.state.Email} type="password" placeholder="Senha" required="" />
                    </div>
                    <div className="w3l-num">
                        <label className="head">RG<span className="w3l-star"> * </span></label>
                        <input type="text" name="RG" placeholder="" required="" />
                    </div>
                    <div className="w3l-sym">
                        <label className="head">CPF<span className="w3l-star"> * </span></label>
                        <input type="text" name="CPF" placeholder="" required="" />
                    </div>
                    <div className="btn">
                        <input type="file" name="anexo" defaultValue="Submit" />
                    </div>
                    <div className="clear"></div>
                    <div className="w3l-user">
                        <label className="head">Endereço<span className="w3l-star"> * </span></label>
                        <input type="text" name="Endereço" placeholder="" required="" />
                    </div>
                    <div className="w3l-num">
                        <label className="head">Cidade<span className="w3l-star"> * </span></label>
                        <input type="text" name="Cidade" placeholder="" required="" />
                    </div>
                    <div className="w3l-sym">
                        <label className="head">Estado<span className="w3l-star"> * </span></label>
                        <input type="text" name="Estado" placeholder="" required="" />
                    </div>
                    <div className="clear"></div>
                    <div className="w3l-num">
                        <label className="head">CEP<span className="w3l-star"> * </span></label>
                        <input type="text" name="CEP" placeholder="" required="" />
                    </div>
                    <div className="w3l-sym">
                        <label className="head">Complemento<span className="w3l-star"></span></label>
                        <input type="text" name="Complemento" placeholder="" />
                    </div>
                    <div className="aceite">
                        <input type="checkbox" id="human" name="human" unchecked="true" />
                        <label htmlFor="human">Estou de acordo com os termos de aceite</label>
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
