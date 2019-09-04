import React, { Component , Fragment } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router , Route , Switch , Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import { Provider as AlertProvider } from "react-alert";
import  AlertTemplate  from "react-alert-template-basic";


import Header from './layout/header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import register from './accounts/register';
import login from './accounts/login';
import PrivateRoute from './common/PrivateRoute';

import {loadUser} from '../actions/auth';


const alertOptions = {
    timeout: 1500,
    position: "top right",
    transition: 'scale',
};



class App extends Component { 
    
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render(){ 
        return (
            <Provider store={store}  >
                <AlertProvider template={AlertTemplate}
                 {...alertOptions}>
                 <Router>
                    <Fragment >
                        <Header />
                        <Alerts />
                        <div className="container mtab mt-4 ">
                           <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />    
                                <Route exact path="/register" component={register} />    
                                <Route exact path="/login" component={login} />    
                           </Switch>   
                        </div>
                    </Fragment>
                 </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App  />, document.getElementById('app'));