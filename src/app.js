import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routes/AppRouter'
import configureStore from './store/configureStore'
import { startSetUser } from './actions/user';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // if(localStorage.getItem('user')==null){
        //     window.location.reload();
        // }
            
        store.dispatch(login(user));
        store.dispatch(startSetUser()).then(() => {
            const json = JSON.stringify(user);
            localStorage.setItem('user', json);
            history.push('/locador');
            //window.location.reload();
            
        });
    }
});
