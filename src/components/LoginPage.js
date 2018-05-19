import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import LoginForm from './LoginForm';

export const LoginPage = ({ startLoginGoogle, startLoginFacebook }) => (
    <div>
        <section id="main" className="cadastro-wrapper">
            <div className="inner">
                <header className="align-center">
                    <h2>Login</h2>
                </header>
                <div className="w3l-main">
                    <div className="w3l-from">
                        <button onClick={startLoginGoogle} className="loginBtn loginBtn--google">Entrar com Google</button>
                        <button onClick={startLoginFacebook} className="loginBtn loginBtn--facebook">Entrar com Facebook</button>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginGoogle: () => dispatch(startLogin('Google')),
    startLoginFacebook: () => dispatch(startLogin('Facebook'))

});

export default connect(undefined, mapDispatchToProps)(LoginPage);
