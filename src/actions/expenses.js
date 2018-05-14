import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD REDUCER
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = ''
            , notes = ''
            , amount = 0
            , createdAt = 0

        } = expenseData;
        const expense = { description, notes, amount, createdAt };

        console.log(expense);
        
        database.ref(`users/${uid}/expenses`)
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
            });
    };
};

//REMOVE REDUCER
export const removeExpenseById = ({ id } = {}
) => ({
    type: 'DEL_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpenseById({ id }));
            });
    };

};


//EDIT REDUCER
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates

});

export const startEditExpense = (id, updates) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        
        return database.ref(`users/${uid}/expenses/${id}`).update(updates)
            .then(() => {
                dispatch(editExpense(id, updates));
            });

    };

};

//SET EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses

});

export const startSetExpense = () => {

    return (dispatch,getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {

                const expenses = [];

                snapshot.forEach((child) => {
                    expenses.push({
                        id: child.key,
                        ...child.val()
                    });
                });
                dispatch(setExpenses(expenses));
            }).catch((e) => {
                console.log(e);
            });
    };
};

