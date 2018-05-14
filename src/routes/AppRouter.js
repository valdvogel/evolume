
import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage';
import AddExpenseDashBoardPage from '../components/AddExpenseDashBoardPage';
import EditExpenseDashBoardPage from '../components/EditExpenseDashBoardPage';
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
import SucessPage from '../components/SucessPage';
import ErrorPage from '../components/ErrorPage';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={MainPage} exact={true}  />
                <Route path="/cadastro" component={UserPage} />
                <Route path="/sobrenos" component={AboutUsPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/locatario" component={LocatarioPage} />
                <Route path="/locador" component={LocadorPage} />
                <Route path="/rent/:id" component={RentPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/contract" component={ContractPage} />
                <Route path="/help" component={HelpPage} />
                <Route path="/sucess" component={SucessPage} />
                <Route path="/error" component={ErrorPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer/>
        </div>
    </Router>
)

export default AppRouter;