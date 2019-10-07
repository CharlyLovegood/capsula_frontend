import React, { Component } from 'react';
import {
    Box,
    Grommet,
} from 'grommet';

import { Switch, Route } from 'react-router-dom'

import HomePage from './components/HomePage/HomePage'
import BookPage from './components/Books/BookPage';
import BookGalleryPage from './components/Books/BookGalleryPage';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';


import SwapPage from './components/Swap/SwapPage';

import UserPage from './containers/UserPage/UserPage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import { AppBar } from './containers/AppBar';


import { history } from './helpers';
import { connect } from 'react-redux';
import { alertActions } from './store/actions';



const theme = {
    global: {
        colors: {
            brand: '#7d4cdb',
            background: '#ffffff',
            contrast: '#000000',
            light_contrast: '#0000000a',
        },
        font: {
            family: 'Roboto',
            size: '16px',
            height: '20px',
        },
    },
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
                <AppBar></AppBar>
                <Box flex align='center' justify='center'>
                    <Switch>
                        <PrivateRoute exact path='/' component={ HomePage }/>
                        <PrivateRoute path='/profile_id=:id' component={ UserPage }/>
                        <PrivateRoute path='/book_id=:id' component={ BookPage } />
                        <PrivateRoute path='/books' component={ BookGalleryPage } />
                        <PrivateRoute path='/swap' component={ SwapPage } />
                        <Route path='/register' component={ RegisterPage }></Route>
                        <Route path='/login' component={ LoginPage }></Route>
                    </Switch>
                </Box>
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