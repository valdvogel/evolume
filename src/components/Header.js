import React from 'react';
import ReactDOM from 'react-dom';
import { history } from '../routes/AppRouter'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import configureStore from '../store/configureStore'


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: false
        }
    }
    onClick = () => {
        localStorage.removeItem('user');
        this.props.startLogout();
        window.location.reload();
        history.push('/');

    }
    componentDidMount = () => {
        //console.log(this.state);
    }
    render() {
        const login = localStorage.getItem('user') != null ? true : false;

        if (!login) {
            return (
                <header id="header">
                    <div className="inner">
                        <NavLink to="/" className="logo">
                            <img src="../images/logo_cut_white.png" width="100px" height="57px" />
                        </NavLink>
                        <NavLink to="/sobrenos" activeClassName="is-active">Sobre Nós</NavLink>
                        <NavLink to="/cadastro" activeClassName="is-active" exact={true}>Cadastrar</NavLink>
                        <NavLink to="/login" activeClassName="is-active">Entrar</NavLink>
                        <NavLink to="/help" activeClassName="is-active">Ajuda</NavLink>
                    </div>
                </header>
            )
        } else {
            return (
                <header id="header">
                    <div className="inner">
                        <NavLink to="/" className="logo">
                            <img src="../images/logo_cut_white.png" width="100px" height="57px" />
                        </NavLink>
                        <NavLink to="/locatario" activeClassName="is-active">Sou Locatário</NavLink>
                        <NavLink to="/locador" activeClassName="is-active" exact={true}>Locador</NavLink>
                        <NavLink to="/help" activeClassName="is-active">Ajuda</NavLink>
                        <button onClick={this.onClick}>Logout</button>
                    </div>
                </header>
            )

        }
    }
}
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())


});

export default connect(undefined, mapDispatchToProps)(Header);