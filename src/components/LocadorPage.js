import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routes/AppRouter'
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';



class LocadorPage extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => { calendarFocused });
    };
    onSubmit = () => {
        console.log('submit');
    }
    componentDidMount=()=>{
        
    };

    render() {
        const id = 12;
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" placeholder="Cidade de aluguel" autoFocus />
                    <br />
                    <select>
                        <option>Escolha um fabricante</option>
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Chery</option>
                        <option>Chevrolet</option>
                        <option>Chrysler</option>
                        <option>Citroen</option>
                        <option>Dodge</option>
                        <option>Fiat</option>
                        <option>Ford</option>
                        <option>Honda</option>
                        <option>Hyundai</option>
                        <option>Infiniti</option>
                        <option>JAC</option>
                        <option>Jeep</option>
                        <option>KIA</option>
                        <option>Land Rover</option>
                    </select>
                    <br />
                    <select>
                        <option>Escolha modelo</option>
                        <option>A1, 3-p Hatch, 10-></option>
                        <option>A1, 5-p Hatch, 12-></option>
                        <option>A3, 5-p Hatch, 96-06</option>
                        <option>A3, 5-p Sedan, 13-></option>
                        <option>A3, 5-p Sportback, 07-12</option>
                        <option>A3, 5-p Sportback, 07-12</option>
                        <option>A3, 5-p Sportback, 07-12</option>
                        <option>A3, 5-p Sportback, 13-></option>
                        <option>A3, 5-p Sportback, 12-></option>
                        <option>A3, 5-p Sportback, 12-></option>
                        <option>A4 Allroad, 5-p Estate, 08-12, 13-></option>
                        <option>A4 Allroad, 5-p Estate, 08-12, 13-></option>
                        <option>A4 Allroad, 5-p Estate, 08-12, 13-></option>
                        <option>A4 Avant, 5-p Wagon, 08-15, 16-></option>
                        <option>A4 Avant, 5-p Wagon, 08-15, 16-></option>
                        <option>A4 Avant, 5-p Wagon, 96-07</option>
                        <option>A4 Avant, 5-p Wagon, 96-07</option>
                        <option>A4 Avant, 5-p Wagon, 96-07</option>
                        <option>A4, 4-p Sedan, 08-15</option>
                        <option>A4, 4-p Sedan, 16-></option>
                        <option>A5, 3-dr Coupé, 07-></option>
                        <option>A5, 5-dr Sportback, 09-></option>
                        <option>A6 Allroad, 5-p Estate, 06-></option>
                        <option>A6 Allroad, 5-p Estate, 06-></option>
                        <option>A6 Avant, 5-p Wagon,  05-10, 11-></option>
                        <option>A6 Avant, 5-p Wagon,  05-10, 11-></option>
                        <option>A6 Avant, 5-p Wagon, 94-97, 98-04</option>
                        <option>A6 Avant, 5-p Wagon, 94-97, 98-04</option>
                        <option>A6 Avant, 5-p Wagon, 94-97, 98-04</option>
                        <option>A6, 4-p Sedan, 04-10</option>
                        <option>A6, 4-p Sedan, 11-></option>
                        <option>A6, 4-p Sedan, 97-00, 01-03</option>
                        <option>A7, 4-p Sportback, 11-></option>
                        <option>A8, 4-p Sedan, 14-></option>
                        <option>Q3, 5-p SUV, 12-></option>
                        <option>Q3, 5-p SUV, 12-></option>
                        <option>Q5, 5-p SUV, 10-16</option>
                        <option>Q5, 5-p SUV, 10-16</option>
                        <option>Q5, 5-p SUV, 17-></option>
                        <option>Q5, 5-p SUV, 17-></option>
                        <option>Q7, 5-p SUV, 06-15</option>
                        <option>Q7, 5-p SUV, 06-15</option>
                        <option>Q7, 5-p SUV, 15-></option>
                        <option>Q7, 5-p SUV, 15-></option>
                        <option>TT, 2-p Coupe, 06-></option>
                    </select>
                    <br />
                    <select>
                        <option>Escolha ano</option>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                    </select>
                    <br />
                    <select>
                        <option>Escolha equipamento</option>
                        <option>Sem recomendacao</option>
                        <option>WingBar Edge</option>
                        <option>Suporte Barra</option>
                        <option>Barra Retangular</option>
                        <option>Barra Aluminio</option>
                        <option>Slide Bar</option>
                        <option>Smart Rack SquareBar</option>
                        <option>Smart Rack AeroBar</option>
                        <option>Adaptador</option>
                    </select>
                    <br />
                    <DateRangePicker
                        startDate={this.state.startDate} 
                        startDateId="your_unique_start_date_id" 
                        endDate={this.state.endDate}
                        endDateId="your_unique_end_date_id"
                        //onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        //focusedInput={this.state.calendarFocused}
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        showClearDates={true}
                        
                    />
                    <br />

                    <Link to={`/rent/${id}`}>
                        Alugar
                    </Link>
                </form>
            </div>
        );
    }

};



const mapStateToProps = (state) => {

};

export default connect()(LocadorPage);