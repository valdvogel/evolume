import uuid from 'uuid';
import moment from 'moment';
import database from '../firebase/firebase';
import { LogInfo } from './audit';


//ADD REDUCER
export const addUser = (user) => (
    {
        type: 'ADD_USER',
        user
    }
);

export const startAddUser = (userData = {}, origin) => {
    return (dispatch, getState) => {

        //init variables
        const uuid = require('uuid/v1');
        const firstName = getState().auth.name;
        const lastName = '';
        const password = '';
        const terms = false;
        const active = false;
        const email = getState().auth.email;
        let uid = -1;
        let user = {};

        if (userData.length == 0) {
            //user enter by facebook or google
            uid = getState().auth.uid;
            user = { uid, firstName, lastName, email, password, terms, active };
        }
        else {
            //user enter by form
            uid = uuid();
            const {
                id = uid,
                firstName = '',
                lastName = '',
                email = '',
                password = '',
                terms = false,
                active = false
            } = userData;
            user = { id, firstName, lastName, email, password, terms, active };
        }

        // add user on database and redux
        database.ref(`users/${uid}/data`)
            .push(user)
            .then((ref) => {
                dispatch(addUser({
                    id: ref.key,
                    ...user
                }));
            });

        LogInfo(uid, origin);
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
export const editUser = (id, updates) => ({
    type: 'EDIT_USER',
    id,
    updates

});

export const startEditUser = (updates) => {
    const uid = updates.uid;
    const id = updates.id;

    database.ref(`users/${uid}/data/${id}`).update(updates)
        .then(() => {
            editUser(id, updates);
        });
};

export const setNewPassword = (updates,password) => {
    const uid = updates.uid;
    const id = updates.id;

    database.ref(`users/${uid}/data/${id}`).update({password: password})
        .then(() => {
            return true;
        });
};


export const setEmailConfirmation = (email) => {
    const data = [];
    database.ref(`users`)
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                database.ref(`users/${child.key}/data`)
                    .once('value')
                    .then((snap) => {
                        snap.forEach((user) => {
                            data.push({
                                _id: user.key,
                                ...user.val()
                            });
                        });
                        data.forEach((cli) => {
                            if (cli.email.toUpperCase() === email.toUpperCase()) {
                                var update = {
                                    active: true
                                };
                                database.ref(`users/${cli.id}/data/${cli._id}`).update(update)
                                    .then(() => {
                                        return true;
                                    });
                            }
                        });
                    });
            });
        });

};


//SET USER
export const setUser = (user) => ({
    type: 'SET_USER',
    user

});

export const startSetUser = (origin) => {

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

                if (user.length == 0) {
                    dispatch(startAddUser(user, origin));
                }
                else {
                    dispatch(setUser(user));
                }

                // // add auditory
                LogInfo(uid, origin);

            }).catch((e) => {
                console.log(e);
            });
    };
};



