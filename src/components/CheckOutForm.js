import React from 'react';
//import { connect } from 'react-redux';
import { history } from '../routes/AppRouter'
import database from '../firebase/firebase';
//import { startAddUser } from '../actions/user';
import numeral from 'numeral';
import moment from 'moment';
import { Encrypt } from './Cryptografy';
import appbaseRef from '../elasticsearch/elasticsearch';
import { getCustomer } from './CheckOutConnect';


class CheckOutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                id: '',
                category: '',
                subcategory: '',
                name: '',
                description: '',
                rate: '',
                video: '',
                resource: '',
                date_from: '',
                date_to: '',
                url: '',
                price: '',
                priceTotal: '',
                contact: '',
                image: '',
                startDate: null,
                endDate: null,
                days: '',
                priceTotal: 0
            },
            user: {
                id: '',
                firstName: '',
                lastName: '',
                rg: '',
                cpf: '',
                email: '',
                password: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    obs: ''
                },
                billingAddress: {
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    obs: ''
                },
                terms: false
            },
            card: {
                name: '',
                number: '',
                birthdayDate: '',
                cpf: '',
                cvv: '',
                expirationDate: ''
            },
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

        // if (this.getUser(this.state.email)) {
        //     this.props.dispatch(startAddUser({
        //         firstName: this.state.firstName,
        //         lastName: this.state.lastName,
        //         email: this.state.email,
        //         password: pass,
        //         terms: this.state.terms,
        //         active: false
        //     }, 'evolume.com.br'
        //     ));

        //     history.push('/sucess');
        // }



    };
    

    componentDidMount = () => {

        const params = new URLSearchParams(this.props.props.location.search);
        var data = {
            type: "equipment",
            id: this.props.props.match.params.id
        }

        const login = JSON.parse(localStorage.getItem('user'));

        var email = '';

        if (login.providerData[0].providerId) {
            email = login.email;
        } else {
            //todo
        }
        var fire = getCustomer(email);


        appbaseRef.get(data).on('data', response => {
            var end = moment(params.get('endDate'), 'DD-MM-YYYY');
            var start = moment(params.get('startDate'), 'DD-MM-YYYY');
            var current = start.startOf('day');
            var days = parseInt(moment.duration(end.diff(current)).asDays() + 1);

            if (!response.found) {
                this.setState({ error: 'Produto não encontrado' })
            } else {
                this.setState({
                    order: {
                        id: response._id,
                        category: response._source.category,
                        subcategory: response._source.subcategory,
                        name: response._source.name,
                        description: response._source.description,
                        rate: response._source.rate,
                        video: response._source.video,
                        resource: response._source.resource,
                        date_from: response._source.date_from,
                        date_to: response._source.date_to,
                        url: response._source.url,
                        price: response._source.price,
                        //priceTotal: priceTotal, //response._source.price,
                        contact: response._source.contact,
                        image: response._source.image,
                        data: response._source,
                        startDate: params.get('startDate'),
                        endDate: params.get('endDate'),
                        days: days
                    },
                    data: fire
                });
            }
        }).on('error', error => {
            console.log("@get error:", error);
        });

    };
    render() {
        return (
            <div>
                <div>
                    <header className="align-center">
                        <h2>Dados de Pagamento</h2>
                    </header>
                    <div className="card">
                        <img src={this.state.order.image} alt="Produto" width="298px" height="298px" />
                        <div className="container-card">
                            <h4><b>Resumo do aluguel</b></h4>
                            <p><b>Produto :</b> {this.state.order.category} </p>
                            <p><b>Período :</b> {this.state.order.startDate}   até  {this.state.order.endDate} ({this.state.order.days} dias)</p>
                            <p><b>Valor Total :</b> R$ {numeral((this.state.order.price * this.state.order.days)).format('0.00')}</p>
                        </div>
                    </div>
                </div>
                <div className="inner">
                    <hr />
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
                                        value={this.state.user.email} type="text" placeholder="Nome" required="" />

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
                                        value={this.state.Cidade} type="text" placeholder="Cidade" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Estado<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onEstadoChange}
                                        value={this.state.Estado} type="text" placeholder="Estado" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">CEP<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCEPChange}
                                        value={this.state.CEP} type="text" placeholder="CEP" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Complemento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onComplementoChange}
                                        value={this.state.Complemento} type="text" placeholder="Complemento" required="" />
                                </div>
                                <div className="clear"></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="inner">
                    <div className="headerCheckout">
                        <hr />
                        <header className="headerCheckout">
                            <h2>Endereço de cobrança</h2>
                        </header>
                    </div>
                    <div className="w3l-main">
                        <div className="w3l-from">
                            <div className="w3l-mail">
                                <label className="head">Logradouro<span className="w3l-star"> * </span></label>
                                <input onChange={this.onLogradouroFaturamentoChange}
                                    value={this.state.LogradouroFaturamento} type="text" placeholder="Logradouro" required="" />
                            </div>
                            <div className="w3l-num">
                                <label className="head">Cidade<span className="w3l-star"> * </span></label>
                                <input onChange={this.onCidadeFaturamentoChange}
                                    value={this.state.CidadeFaturamento} type="text" placeholder="Cidade" required="" />
                            </div>
                            <div className="w3l-sym">
                                <label className="head">Estado<span className="w3l-star"> * </span></label>
                                <input onChange={this.onEstadoFaturamentoChange}
                                    value={this.state.EstadoFaturamento} type="text" placeholder="Estado" required="" />
                            </div>
                            <div className="w3l-num">
                                <label className="head">CEPFaturamento<span className="w3l-star"> * </span></label>
                                <input onChange={this.onCEPFaturamentoChange}
                                    value={this.state.CEPFaturamento} type="text" placeholder="CEP" required="" />
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
                        </div>
                    </div>
                </div>
                <div className="inner">
                    <div className="headerCheckout">
                        <hr />
                        <header className="">
                            <h2>Dados de Pagamento</h2>
                        </header>
                    </div>
                    <div className="w3l-main">
                        <div className="w3l-from">
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CheckOutForm; 
