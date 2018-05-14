import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

//const date = new Date();
// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description :'',
            notes: props.expense ? props.expense.notes : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }))
    };
    onNotesChange = (e) => {
        const notes = e.target.value;
        this.setState(() => ({ notes }))
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        //if(!isNaN(amount)){
        if (!amount || amount.match(/\d{1,2}([\.,][\d{0,2}])?/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }

    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmitForm = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: "Please provide description and amount" }));
        }
        else {
            this.setState(() => ({ error: '' }));
            //this.props.onSubmit(this.state);
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount * 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                notes: this.state.notes
            });

        }
    };
    render() {
        return (
            <div>
                <div>
                    {this.state.error && <p>{this.state.error}</p>}
                </div>
                <form onSubmit={this.onSubmitForm}>
                    <input onChange={this.onDescriptionChange}
                        value={this.state.description} type="text" placeholder="Description" autoFocus />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    /><br />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        value={this.state.notes}
                        onChange={this.onNotesChange}
                        placeholder="Add a note for your expenses (optional)" />
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}