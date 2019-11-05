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
import RedirectPage from './components/RedirectPage/RedirectPage';
import Footer from './components/Footer/Footer';
import SettingsPage from './containers/SettingsPage/SettingsPage';
import HistoryPage from './containers/HistoryPage/HistoryPage';
import HelpPage from './components/HelpPage/Help';

import { history } from './helpers';
import { connect } from 'react-redux';
import { alertActions } from './store/actions';

import styles from './App.module.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = {
    global: {
        colors: {
            textColor: '#868686',
            menuTextColor: '#000000',
            brandGradient: 'linear-gradient(90deg, rgba(127,17,200,1) 0%, rgba(232,90,90,1) 70%, rgba(252,199,69,1) 100%)',
            brandGradientH: 'linear-gradient(0deg, rgba(127,17,200,1) 0%, rgba(232,90,90,1) 70%, rgba(252,199,69,1) 100%)',
            brand: 'rgb(140, 52, 190)',
            brandDark: '#6b277a',
            background: '#ffffff',
            contrast: '#000000',
            light_contrast: '#f9f9f9',
        },
        font: {
            family: 'Roboto',
            size: '16px',
            height: '20px',
        },
        button: {
            border: {
                radius: '8px'
            }
        },
        control: {
            border: {
                radius: '8px'
            }
        },
        size: {
            'xxsmall': '48px',
            'xsmall': '96px',
            'book-height': '270px',
            'book-width': '180px',
            'book-small-height': '200px',
            'book-small-width': '120px',
            'small': '200px',
            'medium': '400px',
            'large': '600px',
            'xlarge': '800px',
            'xxlarge': '1000px',
            'full': '100%'
        }
    },
    heading: {
        font: {
            family: 'ROboto',
            size: '26px',
            height: '20px',
        },
    }
};


const themeUI = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(140, 52, 190)',
        }
    }
    
})


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
                    <ThemeProvider theme={themeUI}>
                        <AppBar></AppBar>
                        <Box align='center'  className={styles.app}>
                            <Switch>
                                <Route exact path='/' component={ HomePage } />
                                <PrivateRoute exact path='/user/:id' component={ UserPage }/>
                                <PrivateRoute path='/book/:id' component={ BookPage } />
                                <PrivateRoute path='/user/:id/library' component={ LibraryPage } />
                                <PrivateRoute path='/reader' component={ SwapPage } />
                                <PrivateRoute path='/owner' component={ SwapPage } />
                                <PrivateRoute path='/search' component={ SearchPage } />
                                <PrivateRoute path='/history' component={ HistoryPage } />
                                <PrivateRoute path='/settings' component={ SettingsPage } />
                                <AuthRoute exact path='/register' component={ RegisterPage } />
                                <AuthRoute exact path='/redirect/vk' component={ RedirectPage } />
                                <AuthRoute exact path='/login' component={ LoginPage } />
                                <Route exact path='/rules' component={ HelpPage } />
                            </Switch>
                        </Box>
                        <Footer></Footer>
                    </ThemeProvider>
                </Router>
            </Grommet>
        );
    }
}

const mapState = state => ({
    alert: state.alert
})

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);

export default connectedApp;