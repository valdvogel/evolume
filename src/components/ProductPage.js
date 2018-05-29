import React from 'react';
import { history } from '../routes/AppRouter'
import { Link } from 'react-router-dom'
import appbaseRef from '../elasticsearch/elasticsearch';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import numeral from 'numeral';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';



class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
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
                startDate: moment().add(1, 'd'),
                endDate: null,
                days: 1,
                focusedInput: null,
                data: [],
                error: ''
            }
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });
        if (startDate != null && endDate != null) {
            var end = endDate;
            var given = moment(end, "YYYY-MM-DD");
            var current = this.state.startDate.startOf('day');
            var days = parseInt(moment.duration(given.diff(current)).asDays() + 1);
            var priceTotal = this.state.price * days;
            this.setState({ days });
            this.setState({ priceTotal });
        }

    };
    onCLick = (e) => {
        history.push(`/checkout/${this.state.id}?startDate=${this.state.startDate.format('YYYY-MM-DD')}&endDate=${this.state.endDate.format('YYYY-MM-DD')}`);
    };
    componentDidMount = () => {
        var data = {
            type: "equipment",
            id: this.props.match.params.id
        }
        appbaseRef.get(data).on('data', response => {
            //console.log("respo===>>>", response);

            if (!response.found) {
                this.setState({ error: 'Produto não encontrado' })
            } else {
                this.setState({
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
                    priceTotal: response._source.price,
                    contact: response._source.contact,
                    image: response._source.image,
                    data: response._source,
                    days: 1
                });
            }
        }).on('error', error => {
            console.log("@get error:", error);
        });
    };
    render() {
        return (
            <div className="container">
                <div>
                    {this.state.error && <p>{this.state.error}</p>}
                </div>
                <div className="row">
                    <div className="about-the-author">
                        <div className="row align-center">
                            <div className="small-12 medium-4 columns">
                                <div className="img-big-wrap">
                                    <img src={this.state.image} />
                                </div>
                                <div className="column small-12 large-6">
                                    <h2>Rating do produto</h2>
                                    <div className="product-option-selection">
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-details column medium-6 center-text-for-small-only">
                                <h2>{this.state.name}</h2>
                                <p className="product-description">{this.state.description}</p>
                                <div className="product-details-add-to-cart">
                                    <p>
                                        <span className="in-stock">Período de aluguel</span>
                                    </p>
                                    <DateRangePicker
                                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                        onDatesChange={this.onDatesChange}
                                        //onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                        showClearDates={true}
                                        displayFormat="DD/MM/YYYY"
                                        startDatePlaceholderText='Data Inicial'
                                        endDatePlaceholderText='Data Final'
                                    />
                                    <hr />
                                    <div className="row">
                                        <p className="qty">Diária :</p>
                                        <p className="price">R$ {numeral(this.state.price).format('0.00')}</p>
                                    </div>
                                    <div className="row">
                                        <p className="qty">Dias Selecionados : {this.state.days}</p>
                                        <p className="price">R$ {numeral(this.state.priceTotal).format('0.00')}</p>
                                    </div>
                                    <button onClick={this.onCLick} className="buttonRent">Reservar agora!</button>
                                </div>
                            </div>
                        </div>
                        <div className="small-12 medium-8 columns">
                            <h4 className="separator-left">Recursos</h4>
                            <p className="separator-left-p">{this.state.resource}</p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

};

export default ProductPage;