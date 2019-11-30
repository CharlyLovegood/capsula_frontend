import React, { Component } from 'react';

import { Box, Grommet } from 'grommet';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import { Router, Switch, Route, Redirect } from 'react-router-dom'


import { AppBar,
    SearchPage, 
    UserPage, 
    BookPage, 
    HistoryPage, 
    SettingsPage, 
    WishList, 
    LibraryPage,
    SwapPage,
    LoginPage,
    RegisterPage,
    HomePage 
} from './containers';
    
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import AuthRoute from './components/PrivateRouter/AuthRouter';
import RedirectPage from './components/RedirectPage/RedirectPage';
import Footer from './components/Footer/Footer';
import HelpPage from './components/HelpPage/Help';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { history } from './helpers';
import { connect } from 'react-redux';

import styles from './App.module.css';

import { alertActions } from './store/actions';



import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCZWHC_x84NCh6firSfXp5y7EfSF0mo5dU",
    authDomain: "bookovsky-71d58.firebaseapp.com",
    databaseURL: "https://bookovsky-71d58.firebaseio.com",
    projectId: "bookovsky-71d58",
    storageBucket: "bookovsky-71d58.appspot.com",
    messagingSenderId: "139443943838",
    appId: "1:139443943838:web:12bf89195711431daffe8f"
  };

firebase.initializeApp(firebaseConfig);

const initializePush = () => {
    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(() => {
            console.log('Permission is granted by user');
            return messaging.getToken();
        })
        .then(token => {
            console.log('FCM Token:', token);
        })
        .catch(error => {
            console.log('Error Occurred', error);
        });
}

initializePush();





const theme = {
    global: {
        colors: {
            textColor: '#868686',
            menuTextColor: '#7a7171',
            brandGradient: 'linear-gradient(90deg, rgb(90, 39, 113) 0%, rgb(234, 65, 106) 80%, rgb(234, 180, 72) 100%)',
            brandGradientH: 'linear-gradient(0deg, rgb(90, 39, 113) 0%, rgb(234, 65, 106) 80%, rgb(234, 180, 72) 100%)',
            brand: '#a517b5',
            brandDark: '#5c0b65',
            background: '#ffffff',
            contrast: '#000000',
            light_contrast: '#f9f9f9',
            focus: '#a517b5',
            // 'accent-1': '#ff8d75'
            placeholder: '#7a7171'
        },
        font: {
            family: 'Open Sans Condensed',
            size: '18px',
            height: '20px'
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
            'book-small-height': '210px',
            'book-small-width': '140px',
            'small': '200px',
            'medium': '400px',
            'large': '600px',
            'xlarge': '800px',
            'xxlarge': '1000px',
            'full': '100%'
        },
        input: {
            weight: '200'
        }
        
    },
    heading: {
        font: {
            family: 'Open Sans',
            size: '26px',
            height: '20px',
        },
    },
    tab: {
        border: {
            active: {
                color: '#5c0b65'
            },
            hover: {
                color: '#5c0b65'
            },
            color: '#7a7171'
        },
        hover: {
            color: '#5c0b65'
        },
        active: {
            color: '#5c0b65'
        },
        color: '#7a7171'
    }
};


const themeUI = createMuiTheme({
    palette: {
        primary: {
            main: '#a517b5',
        }
    },
    typography: {
        "fontFamily": "\"Open Sans Condensed\", sans-serif",
        "fontSize": 18,
        "fontWeightLight": 300
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
            <Grommet theme={theme}>
                <Router history={history}>
                    <ScrollToTop />
                    <ThemeProvider theme={themeUI}>
                        <AppBar></AppBar>
                        <Box align='center' className={styles.app}>
                            <Switch>
                                <Route exact path='/' component={ HomePage } />
                                <PrivateRoute exact path='/user/:id' component={ UserPage }/>
                                <PrivateRoute path='/book/:id' component={ BookPage } />
                                <PrivateRoute path='/user/:id/wishlist' component={ WishList } />
                                <PrivateRoute path='/user/:id/library' component={ LibraryPage } />
                                <PrivateRoute path='/reader' component={ SwapPage } />
                                <PrivateRoute path='/owner' component={ SwapPage } />
                                <PrivateRoute path='/search/:page' component={ SearchPage } />
                                <PrivateRoute path='/history' component={ HistoryPage } />
                                <PrivateRoute path='/settings' component={ SettingsPage } />

                                <AuthRoute exact path='/register' component={ RegisterPage } />
                                <AuthRoute exact path='/redirect/vk' component={ RedirectPage } />
                                <AuthRoute exact path='/login' component={ LoginPage } />
                                <Route exact path='/rules' component={ HelpPage } />

                                <Redirect from="*" to="/" />
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