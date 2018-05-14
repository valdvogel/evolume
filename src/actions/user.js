import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD REDUCER
export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});

export const startAddUser = (userData = {}) => {
    return (dispatch, getState) => {

        const uuid = require('uuid/v1');
        const firstName = getState().auth.name;
        const lastName = '';
        const password = '';
        const email = getState().auth.email;
        
        let uid = -1;


        let user = {};

        if (userData.length == 0) {

            uid = getState().auth.uid;
            user = { uid, firstName, lastName, email, password };
        }
        else {

            uid = uuid();
            const {
                id = uid,
                firstName = '',
                lastName = '',
                email = '',
                password = ''
            } = userData;
            user = { id, firstName, lastName, email, password };
        }

        database.ref(`users/${uid}/data`)
            .push(user)
            .then((ref) => {
                dispatch(addUser({
                    id: ref.key,
                    ...user
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/data/${id}`).update(updates)
            .then(() => {
                dispatch(editExpense(id, updates));
            });

    };

};


//SET USER
export const setUser = (user) => ({
    type: 'SET_USER',
    user

});

export const startSetUser = () => {

    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/data`)
            .once('value')
            .then((snapshot) => {
                const user = [];
                snapshot.forEach((child) => {
                    user.push({
                        id: child.key,
                        ...child.val()
                    });
                });
                //console.log('user', user);

                if (user.length == 0) {
                    dispatch(startAddUser(user));
                }
                else {
                    dispatch(setUser(user));
                }
            }).catch((e) => {
                console.log(e);
            });
    };
};



