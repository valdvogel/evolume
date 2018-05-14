//EXPENSES REDUCER

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_EXPENSES':
            return action.expenses;
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

export default expensesReducer;