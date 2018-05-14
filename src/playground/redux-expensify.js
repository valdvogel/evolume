import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


//ADD REDUCER
const addExpense = ({
        description = ''
        ,notes = ''
        ,amount = 0
        ,createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense:{
        id: uuid(),
        description,
        notes,
        amount,
        createdAt
    }
});

//REMOVE REDUCER
const removeExpenseById = ({
        id
    } = {}
) => ({
    type: 'DEL_EXPENSE',
    id
});


//EDIT REDUCER
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates

});


//ADD FILTER

const setTextFilter = (text = '') =>({
    type: 'SET_FILTER',
    text
});
const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT'
});
const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});

const setStartDate = (date) =>({
    type: 'SET_START_DATE',
    date
});

const setEndDate = (date) =>({
    type: 'SET_END_DATE',
    date
});

//EXPENSES REDUCER

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return state.concat(action.expense);
        case 'DEL_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else{
                    return expense;
                }

            });
        default: 
            return state;
    }
};

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};


const filtersReducer = (state = filterReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_FILTER':
            return {
                ...state,
                text: action.text

            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };
        default: 
            return state;
    }
};


const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) =>{
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a , b)=>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1; 
        }

        if(sortBy === 'amount')
            return a.amount < b.amount ? 1 : -1; 
    });
}


const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
        
    })
);



store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

    
});


const item1 = store.dispatch(addExpense({description : 'Rent', amount: 10, createdAt: 1000}));
const item2 = store.dispatch(addExpense({description : 'Coffee', amount: 20, createdAt: -1000}));

// store.dispatch(removeExpenseById({id :item1.expense.id}));

// store.dispatch(editExpense(item2.expense.id, {amount: 200}));

//store.dispatch(setTextFilter('e'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(2000));
//store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'id',
        description: '1 descr',
        note: 'This is my note1',
        amount: 54500,
        createdAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}