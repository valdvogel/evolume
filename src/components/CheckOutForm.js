import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import appbaseRef from '../elasticsearch/elasticsearch';
import { getCustomer, makePayment, getCustomersMoip } from './CheckOutCore';
import MoipValidator from '../api/moip/validator';
import ModalPage from './ModalPage';




class CheckOutForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectedOption = this.handleSelectedOption.bind(this);
        this.state = {
            order_id: '',
            order_category: '',
            order_subcategory: '',
            order_name: '',
            order_description: '',
            order_rate: '',
            order_video: '',
            order_resource: '',
            order_date_from: '',
            order_date_to: '',
            order_url: '',
            order_price: '',
            order_priceTotal: '',
            order_contact: '',
            order_image: '',
            order_startDate: null,
            order_endDate: null,
            order_days: '',
            order_priceTotal: 0,
            user_id: '',
            user_firstName: '',
            user_lastName: '',
            user_rg: '',
            user_cpf: '',
            user_email: '',
            user_password: '',
            user_birthday: '',
            user_address_street: '',
            user_address_city: '',
            user_address_state: '',
            user_address_zip: '',
            user_address_obs: '',
            billingAddress_street: '',
            billingAddress_city: '',
            billingAddress_state: '',
            billingAddress_zip: '',
            billingAddress_obs: '',
            billingAddress_same: false,
            card_name: '',
            card_number: '',
            card_birthdayDate: '',
            card_document: '',
            card_cvv: '',
            card_expirationDate: '',
            data: [],
            moip: [],
            error: ''
        }
    };

    /*DADOS PESSOAIS*/
    onFirstNameChange = (e) => {
        const value = e.target.value;
        this.setState({ user_firstName: value });

    };
    onLastNameChange = (e) => {
        const value = e.target.value;
        this.setState({ user_lastName: value });

    };
    onRGChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ user_rg: value });

    };
    onCPFChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ user_cpf: value });

    };
    onLogradouroChange = (e) => {
        const value = e.target.value;
        this.setState({ user_address_street: value });

    };
    onCidadeChange = (e) => {
        const value = e.target.value;
        this.setState({ user_address_city: value });

    };
    onEstadoChange = (e) => {
        const value = e.target.value;
        this.setState({ user_address_state: value });

    };
    onCEPChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ user_address_zip: value });

    };
    onComplementoChange = (e) => {
        const value = e.target.value;
        this.setState({ user_address_obs: value });

    };
    onBirthdayChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ user_birthday: value });
    };
    onTelefoneChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ user_telefone: value });
    };


    /*ENDERECO COBRANCA*/
    onLogradouroFaturamentoChange = (e) => {
        const value = e.target.value;
        this.setState({ billingAddress_street: value });

    };
    onCidadeFaturamentoChange = (e) => {
        const value = e.target.value;
        this.setState({ billingAddress_city: value });

    };
    onEstadoFaturamentoChange = (e) => {
        const value = e.target.value;
        this.setState({ billingAddress_state: value });

    };
    onCEPFaturamentoChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ billingAddress_zip: value });

    };
    onComplementoFaturamentoChange = (e) => {
        const value = e.target.value;
        this.setState({ billingAddress_obs: value });

    };
    onBillingAddress = (e) => {
        const value = !this.state.billingAddress_same;
        this.setState({ billingAddress_same: value });

        if (value) {
            this.setState({
                billingAddress_street: this.state.user_address_street,
                billingAddress_city: this.state.user_address_city,
                billingAddress_state: this.state.user_address_state,
                billingAddress_zip: this.state.user_address_zip,
                billingAddress_obs: this.state.user_address_obs
            });
        } else {
            this.setState({
                billingAddress_street: '',
                billingAddress_city: '',
                billingAddress_state: '',
                billingAddress_zip: '',
                billingAddress_obs: ''
            });
        }

    };

    /*DADOS CARTAO*/
    onNameCardChange = (e) => {
        const value = e.target.value;
        this.setState({ card_name: value });

    };
    onNumberCardChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ card_number: value });

    };
    onBirthdayCardChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ card_birthdayDate: value });

    };
    onDocumentCardChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ card_document: value });

    };
    onCVVCardChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ card_cvv: value });


    };
    onDateValidationCardChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^[0-9\b]+$/))
            this.setState({ card_expirationDate: value });

    };
    onSaveCard = (e) => {
        const value = !this.state.card_saveCard;
        this.setState({ card_saveCard: value });

    };

    onSubmitForm = (e) => {
        e.preventDefault();


        /*VALIDACAO DOS CAMPO OBRIGATORIOS*/
        if (!this.state.user_firstName) {
            this.setState(() => ({ error: "Por favor, informar o campo Nome!" }));
            return false;
        }
        else if (!this.state.user_lastName) {
            this.setState(() => ({ error: "Por favor, informar o campo Sobrenome!" }));
            return false;
        }
        else if (!this.state.user_rg) {
            this.setState(() => ({ error: "Por favor, informar o campo RG!" }));
            return false;
        }
        else if (!this.state.user_cpf) {
            this.setState(() => ({ error: "Por favor, informar o campo CPF!" }));
            return false;
        }
        // else if (!this.state.user_cpf.match(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)) {
        //     this.setState(() => ({ error: "Por favor, informar o campo CPF corretamente!" }));
        //     return false;
        // }
        else if (!this.state.user_birthday) {
            this.setState(() => ({ error: "Por favor, informar o campo Data de Nascimento!" }));
            return false;
        }
        else if (!this.state.user_telefone) {
            this.setState(() => ({ error: "Por favor, informar o campo Telefone!" }));
            return false;
        }
        else if (!this.state.user_address_street) {
            this.setState(() => ({ error: "Por favor, informar o campo logradouro!" }));
            return false;
        }
        else if (!this.state.user_address_city) {
            this.setState(() => ({ error: "Por favor, informar o campo cidade!" }));
            return false;
        } else if (!this.state.user_address_state) {
            this.setState(() => ({ error: "Por favor, informar o campo estado!" }));
            return false;
        }
        else if (!this.state.user_address_zip) {
            this.setState(() => ({ error: "Por favor, informar o campo CEP!" }));
            return false;
        }

        else if (!this.state.billingAddress_street) {
            this.setState(() => ({ error: "Por favor, informar o campo logradouro dos dados de cobrança!" }));
            return false;
        }
        else if (!this.state.billingAddress_city) {
            this.setState(() => ({ error: "Por favor, informar o campo cidade dos dados de cobrança!" }));
            return false;
        }
        else if (!this.state.billingAddress_state) {
            this.setState(() => ({ error: "Por favor, informar o campo estado dos dados de cobrança!" }));
            return false;
        }
        else if (!this.state.billingAddress_zip) {
            this.setState(() => ({ error: "Por favor, informar o campo CEP dos dados de cobrança!" }));
            return false;
        }
        else if (!this.state.card_name) {
            this.setState(() => ({ error: "Por favor, informar o campo Nome Completo do Titular!" }));
            return false;
        }
        else if (!this.state.card_number) {
            this.setState(() => ({ error: "Por favor, informar o campo Número Do Cartão De Crédito!" }));
            return false;
        }
        else if (!MoipValidator.isValidNumber(this.state.card_number)) {
            this.setState(() => ({ error: "Por favor, informar o campo Número Do Cartão De Crédito com um valor válido!" }));
            return false;
        }
        else if (!this.state.card_birthdayDate) {
            this.setState(() => ({ error: "Por favor, informar o campo Data de Nascimento!" }));
            return false;
        }
        else if (!this.state.card_document) {
            this.setState(() => ({ error: "Por favor, informar o campo Documento do titular!" }));
            return false;
        }
        // else if (!this.state.card_document.match(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/)) {
        //     this.setState(() => ({ error: "Por favor, informar o campo CPF corretamente!" }));
        //     return false;
        // }
        else if (!this.state.card_cvv) {
            this.setState(() => ({ error: "Por favor, informar o campo Cód. Segurança!" }));
            return false;
        }
        else if (!MoipValidator.isSecurityCodeValid(this.state.card_number, this.state.card_cvv)) {
            this.setState(() => ({ error: "Por favor, informar o campo Cód. Segurança com um valor válido!" }));
            return false;
        }
        else if (!this.state.card_expirationDate) {
            this.setState(() => ({ error: "Por favor, informar o campo Data de Validade!" }));
            return false;
        }
        else if (!MoipValidator.isExpiryDateValid(this.state.card_expirationDate.substring(0, 2), this.state.card_expirationDate.substring(2, 4))) {
            this.setState(() => ({ error: "Por favor, informar o campo  Data de Validade com um valor válido!" }));
            return false;
        }

        //console.log(this.state);
        makePayment(this.state);




    };
    handleSelectedOption(){
        this.setState(()=>({
            error: undefined
        }) ) 
    };


    componentDidMount = () => {

        const params = new URLSearchParams(this.props.props.location.search);
        var data = {
            type: "equipment",
            id: this.props.props.match.params.id
        }

        const login = JSON.parse(localStorage.getItem('user'));

        var email = '';
        var firstName = '';

        if ((typeof login.providerData !== "undefined") && (login.providerData[0].providerId)) {
            email = login.email;
            firstName = login.displayName;
        } else {
            email = login.email;
            firstName = login.firstName;
        }
        var fire = getCustomer();
        var moip = getCustomersMoip();


        appbaseRef.get(data).on('data', response => {
            var end = moment(params.get('endDate'), 'DD-MM-YYYY');
            var start = moment(params.get('startDate'), 'DD-MM-YYYY');
            var current = start.startOf('day');
            var days = parseInt(moment.duration(end.diff(current)).asDays() + 1);

            if (!response.found) {
                this.setState({ error: 'Produto não encontrado' })
            } else {
                this.setState({
                    order_id: response._id,
                    order_category: response._source.category,
                    order_subcategory: response._source.subcategory,
                    order_name: response._source.name,
                    order_description: response._source.description,
                    order_rate: response._source.rate,
                    order_video: response._source.video,
                    order_resource: response._source.resource,
                    order_date_from: response._source.date_from,
                    order_date_to: response._source.date_to,
                    order_url: response._source.url,
                    order_price: response._source.price,
                    order_contact: response._source.contact,
                    order_image: response._source.image,
                    order_email: response._source.email,
                    order_startDate: params.get('startDate'),
                    order_endDate: params.get('endDate'),
                    order_days: days,
                    user_id: '',
                    user_firstName: firstName != '' ? firstName : '',
                    user_lastName: '',
                    user_rg: '',
                    user_cpf: '',
                    user_email: email != '' ? email : '',
                    user_telefone: '',
                    user_password: '',
                    user_birthday: '',
                    user_address_street: '',
                    user_address_city: '',
                    user_address_state: '',
                    user_address_zip: '',
                    user_address_obs: '',
                    billingAddress_street: '',
                    billingAddress_city: '',
                    billingAddress_state: '',
                    billingAddress_zip: '',
                    billingAddress_obs: '',
                    billingAddress_same: false,
                    card_name: '',
                    card_number: '',
                    card_birthdayDate: '',
                    card_document: '',
                    card_cvv: '',
                    card_expirationDate: '',
                    card_saveCard: false,
                    data: fire,
                    moip: moip,
                    error: ''
                });
            }
        }).on('error', error => {
            console.log("@get error:", error);
        });

        // console.log(this.state);

    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        <header className="align-center">
                            <h2>Dados de Pagamento</h2>
                        </header>
                        <div className="card">
                            <img src={this.state.order_image} alt="Produto" width="298px" height="298px" />
                            <div className="container-card">
                                <h4><b>Resumo do aluguel</b></h4>
                                <p><b>Produto :</b> {this.state.order_category} </p>
                                <p><b>Período :</b> {this.state.order_startDate}   até  {this.state.order_endDate} ({this.state.order_days} dias)</p>
                                <p><b>Valor Total :</b> R$ {numeral((this.state.order_price * this.state.order_days)).format('0.00')}</p>
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
                                <div className="w3l-num">
                                    <label className="head">Nome<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onFirstNameChange}
                                        value={this.state.user_firstName} type="text" placeholder="Nome" required="" />

                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Sobrenome<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onLastNameChange}
                                        value={this.state.user_lastName} type="text" placeholder="Sobrenome" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">RG<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onRGChange}
                                        value={this.state.user_rg} type="text" placeholder="RG" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">CPF<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCPFChange}
                                        value={this.state.user_cpf} type="text" maxLength="11" placeholder="CPF" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Data de Nascimento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onBirthdayChange}
                                        value={this.state.user_birthday} type="text" maxLength="8" placeholder="dia mês ano" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Telefone<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onTelefoneChange}
                                        value={this.state.user_telefone} type="text" maxLength="11" placeholder="Telefone" required="" />
                                </div>
                                <div className="w3l-mail">
                                    <label className="head">Endereço Completo<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onLogradouroChange}
                                        value={this.state.user_address_street} type="text" placeholder="Endereço" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Cidade<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCidadeChange}
                                        value={this.state.user_address_city} type="text" placeholder="Cidade" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Estado<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onEstadoChange}
                                        value={this.state.user_address_state} type="text" maxLength="2" placeholder="Estado" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">CEP<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCEPChange}
                                        value={this.state.user_address_zip} type="text" maxLength="8" placeholder="CEP" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Complemento<span className="w3l-star"> </span></label>
                                    <input onChange={this.onComplementoChange}
                                        value={this.state.user_address_obs} type="text" placeholder="Complemento" />
                                </div>

                                <div className="clear"></div>
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
                                    <label className="head">Endereço Completo<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onLogradouroFaturamentoChange}
                                        value={this.state.billingAddress_street} type="text" placeholder="Endereço" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Cidade<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCidadeFaturamentoChange}
                                        value={this.state.billingAddress_city} type="text" placeholder="Cidade" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Estado<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onEstadoFaturamentoChange}
                                        value={this.state.billingAddress_state} type="text" maxLength="2" placeholder="Estado" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">CEP<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCEPFaturamentoChange}
                                        value={this.state.billingAddress_zip} type="text" maxLength="8" placeholder="CEP" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Complemento<span className="w3l-star"> </span></label>
                                    <input onChange={this.onComplementoFaturamentoChange}
                                        value={this.state.billingAddress_obs} type="text" placeholder="Complemento" />
                                </div>
                                <div className="botaoaceite" >
                                    <input type="checkbox" id="human" name="human" checked={this.state.billingAddress_same} onChange={this.onBillingAddress}
                                        value={this.state.billingAddress_same} />
                                </div>
                                <label htmlFor="human">Mesmo endereço de moradia </label>
                            </div>
                        </div>
                    </div>
                    <div className="inner">
                        <div className="headerCheckout">
                            <hr />
                            <header className="">
                                <h2>Dados de Pagamento</h2>
                            </header>
                            <div className="moip" >
                                <img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/moip_rgb_positivo_pequeno.png" alt="moip" />
                            </div>
                            <div className="cartao" >
                                <img src="https://s3.us-east-2.amazonaws.com/evolumewebappimages/cartoes.png" alt="cartoes" />
                            </div>
                        </div>
                        <div className="w3l-main">
                            <div className="w3l-from">
                                <div className="w3l-mail">
                                    <label className="head">Nome completo do titular<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onNameCardChange}
                                        value={this.state.card_name} type="text" placeholder="Idêntico ao do cartão" required="" />
                                </div>
                                <div className="w3l-mail">
                                    <label className="head">Número do cartão de crédito<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onNumberCardChange}
                                        value={this.state.card_number} type="text" maxLength="16" placeholder="0000 0000 0000 0000" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Data Nascimento<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onBirthdayCardChange}
                                        value={this.state.card_birthdayDate} type="text" maxLength="8" placeholder="dia mês ano" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Documento do titular<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onDocumentCardChange}
                                        value={this.state.card_document} type="text" maxLength="11" placeholder="CPF" required="" />
                                </div>
                                <div className="w3l-num">
                                    <label className="head">Cód. Segurança<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onCVVCardChange}
                                        value={this.state.card_cvv} type="text" maxLength="3" placeholder="CVV" required="" />
                                </div>
                                <div className="w3l-sym">
                                    <label className="head">Data de validade<span className="w3l-star"> * </span></label>
                                    <input onChange={this.onDateValidationCardChange}
                                        value={this.state.card_expirationDate} type="text" maxLength="6" placeholder="mês ano" required="" />
                                </div>
                                <div className="clear"></div>
                                <div className="botaoaceite2" >
                                    <input type="checkbox" id="human1" name="human1" onChange={this.onSaveCard}
                                        value={this.state.card_saveCard} />
                                </div>
                                <label htmlFor="human">Salvar esse cartão para compras futuras</label>
                                <div className="clear"></div>
                                <div className="btn">
                                    <input type="submit" name="enviar" value="Pagar" />
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <ModalPage
                            selectedOption={this.state.error}
                            handleSelectedOption={this.handleSelectedOption}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
export default CheckOutForm; 
