import React, { Component } from 'react';
import {
    Box,
    Grommet,
} from 'grommet';

import { Router, Switch, Route } from 'react-router-dom'

import HomePage from './components/HomePage/HomePage'
import BookPage from './containers/BookPage/BookPage';
import LibraryPage from './containers/LibraryPage/LibraryPage';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import AuthRoute from './components/PrivateRouter/AuthRouter';


import SwapPage from './containers/SwapPage/SwapPage';

import UserPage from './containers/UserPage/UserPage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import { AppBar } from './containers/AppBar';
import { SearchPage } from './containers/SearchPage';
import SettingsPage from './containers/SettingsPage/SettingsPage';

import { history } from './helpers';
import { connect } from 'react-redux';
import { alertActions } from './store/actions';




const theme = {
    global: {
        colors: {
            textColor: '#868686',
            menuTextColor: '#000000',
            brandGradient: 'linear-gradient(90deg, rgba(125,76,219,1) 0%, rgba(112,56,219,1) 100%)',
            brand: '#7d4cdb',
            background: '#ffffff',
            contrast: '#000000',
            light_contrast: '#f9f9f9',
        },
        font: {
            family: 'Roboto',
            size: '16px',
            height: '20px',
        },
    },

            button: {
                border: {
                  radius: "8px"
                }
            }
};



class App extends Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }
    
    render() {
        return (
            <Grommet theme={theme} full>
                <Router history={history}>
                    <AppBar></AppBar>
                    <Box flex align='center' justify='center'>
                        <Switch>
                            <PrivateRoute exact path='/' component={ HomePage }/>
                            <PrivateRoute path='/user/:id' component={ UserPage }/>
                            <PrivateRoute path='/book/:id' component={ BookPage } />
                            <PrivateRoute path='/library' component={ LibraryPage } />
                            <PrivateRoute path='/swap' component={ SwapPage } />
                            <PrivateRoute path='/search' component={ SearchPage } />
                            <PrivateRoute path='/settings' component={ SettingsPage } />
                            <AuthRoute exact path='/register' component={ RegisterPage } />
                            <AuthRoute exact path='/login' component={ LoginPage } />
                        </Switch>
                    </Box>
                </Router>
            </Grommet>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);

export default connectedApp;