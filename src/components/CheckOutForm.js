import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routes/AppRouter'
import database from '../firebase/firebase';
import { startAddUser } from '../actions/user';
import { Encrypt } from './Cryptografy';

class CheckOutForm extends React.Component {
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

            history.push('/sucess');
        }



    };


    componentDidMount = () => {
        // var data = [];
        // database.ref(`users`)
        //     .once('value')
        //     .then((snapshot) => {
        //         snapshot.forEach((child) => {
        //             database.ref(`users/${child.key}/data`)
        //                 .once('value')
        //                 .then((snap) => {
        //                     snap.forEach((user) => {
        //                         data.push({
        //                             _id: user.key,
        //                             ...user.val()
        //                         });

        //                     });
        //                 });
        //         });
        //     });
        // this.setState({ data: data });
    };
    render() {
        return (
            <div>
                <div>
                    <header className="align-center">
                        <h2>Dados de Pagamento</h2>
                    </header>
                    <div class="card">
                        <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/Rafael1.jpeg" alt="Avatar" width="298px" height="298px" />
                        <div className="container-card">
                            <h4><b>Resumo do aluguel</b></h4>
                            <p>Produto : </p>
                            <p>Período :</p>
                            <p>Valor Total :</p>
                        </div>
                    </div>
                </div>
                <div className="inner">
                    <header className="align-center">
                        <h2>Dados Pessoais</h2>
                    </header>
                    <div className="w3l-main">
                        <div className="w3l-from">
                            <div>
                                {this.state.error && <p>{this.state.error}</p>}
                            </div>
                            <form onSubmit={this.onSubmitForm}>
                                <div className="w3l-num">
                                    <label className="head">Nome<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onFirstNameChange}
                                        value={this.state.firstName} type="text" placeholder="Nome" required="" />

                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Sobrenome<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onLastNameChange}
                                        value={this.state.lastName} type="text" placeholder="Sobrenome" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">RG<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onRGChange}
                                        value={this.state.RG} type="text" placeholder="RG" required="" />

                                </div>
                                <div className="w3l-sym">
                                    <label className="head">CPF<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCPFChange}
                                        value={this.state.CPF} type="text" placeholder="CPF" required="" />
                                </div>
                                <div className="w3l-mail">
                                    <label className="head">Logradouro<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onLogradouroChange}
                                        value={this.state.Logradouro} type="text" placeholder="Logradouro" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Cidade<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCidadeChange}
                                        value={this.state.Cidade} type="text" placeholder="Cidade"  required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Estado<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onEstadoChange}
                                        value={this.state.Estado} type="text" placeholder="Estado" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">CEP<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCEPChange}
                                        value={this.state.CEP} type="text" placeholder="CEP"  required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Complemento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onComplementoChange}
                                        value={this.state.Complemento} type="text" placeholder="Complemento" required="" />
                                </div>
                                <div className="clear"></div>
                                <div className="headerCheckout">
                                    <header className="headerCheckout">
                                        <h2>Endereço de cobrança</h2>
                                    </header>
                                </div>
                                <div className="w3l-mail">
                                    <label className="head">Logradouro<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onLogradouroFaturamentoChange}
                                        value={this.state.LogradouroFaturamento} type="text" placeholder="Logradouro" required="" />
                                </div>

                                <div className="w3l-num">
                                    <label className="head">Cidade<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCidadeFaturamentoChange}
                                        value={this.state.CidadeFaturamento} type="text" placeholder="Cidade"  required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Estado<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onEstadoFaturamentoChange}
                                        value={this.state.EstadoFaturamento} type="text" placeholder="Estado" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">CEPFaturamento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCEPFaturamentoChange}
                                        value={this.state.CEPFaturamento} type="text" placeholder="CEP"  required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Complemento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onComplementoFaturamentoChange}
                                        value={this.state.ComplementoFaturamento} type="text" placeholder="Complemento" required="" />
                                </div>

                                <div className="botaoaceite" >
                                    <input type="checkbox" id="human" name="human" checked={this.state.sameAddress} onChange={this.onBillingAddress}
                                        value={this.state.terms} />
                                </div>
                                <label htmlFor="human">Mesmo endereco de moradia </label>
                                <div className="headerCheckout">
                                    <header className="">
                                        <h2>Dados de Pagamento</h2>
                                    </header>
                                </div>
                                <div className="w3l-mail">
                                    <label className="head">Nome completo do titular<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onNameCardChange}
                                        value={this.state.NameCard} type="text" placeholder="Idêntico ao do cartão" required="" />
                                </div>

                                <div className="w3l-mail">
                                    <label className="head">Número do cartão de crédito<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onNumberCardChange}
                                        value={this.state.NumberCard} type="text" placeholder="0000 0000 0000 0000" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Data Nascimento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onBirthdayCardChange}
                                        value={this.state.BirthdayCard} type="text" placeholder="dia/mês/ano" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Documento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onDocumentCardChange}
                                        value={this.state.DocumentCard} type="text" placeholder="CPF/CNPJ" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Cód. Segurança<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCVVCardChange}
                                        value={this.state.CVVCard} type="text" placeholder="CVV" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Data de validade<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onDateValidationCardChange}
                                        value={this.state.DateValidationCard} type="text" placeholder="mês/ano" required="" />
                                </div>
                                <div className="clear"></div>
                                <div className="botaoaceite" >
                                    <input type="checkbox" id="human" name="human" checked={this.state.sameAddress} onChange={this.onBillingAddress}
                                        value={this.state.terms} />
                                </div>
                                <label htmlFor="human">Salvar esse cartão para compras futuras</label>
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

        )
    }
}

export default connect()(CheckOutForm); 
