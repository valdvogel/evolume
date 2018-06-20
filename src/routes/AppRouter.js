
import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainPage from '../components/MainPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserPage from '../components/UserPage';
import LocadorPage from '../components/LocadorPage';
import LocatarioPage from '../components/LocatarioPage';
import RentPage from '../components/RentPage';
import PaymentPage from '../components/PaymentPage';
import ContractPage from '../components/ContractPage';
import AboutUsPage from '../components/AboutUsPage';
import AuthPage from '../components/AuthPage';
import SucessPage from '../components/SucessPage';
import ErrorPage from '../components/ErrorPage';
import MainSearch from '../components/MainSearch';
import ProductPage from '../components/ProductPage';
import CheckOutPage from '../components/CheckOutPage';
import UserConfirmPage from '../components/UserConfirmPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import ResetPasswordConfirmPage from '../components/ResetPasswordConfirmPage';



export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={MainPage} exact={true}  />
                <Route path="/cadastro" component={UserPage} />
                <Route path="/confirmacao" component={UserConfirmPage} />
                <Route path="/sobrenos" component={AboutUsPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/reset" component={ResetPasswordPage} />
                <Route path="/novasenha" component={ResetPasswordConfirmPage} />
                <Route path="/autenticado" component={AuthPage} />
                <Route path="/locatario" component={LocatarioPage} />
                <Route path="/locatario/equipamento/:id" component={LocatarioPage} />
                <Route path="/produto/:id" component={ProductPage} />
                <Route path="/locador" component={LocadorPage} />
                <Route path="/rent/:id" component={RentPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/checkout/:id" component={CheckOutPage} />
                <Route path="/contrato/:id" component={ContractPage} />
                <Route path="/help" component={HelpPage} />
                <Route path="/sucesso" component={SucessPage} />
                <Route path="/error" component={ErrorPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer/>
        </div>
    </Router>
)

export default AppRouter;