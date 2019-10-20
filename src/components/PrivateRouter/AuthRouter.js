import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('username')
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
)

export default AuthRouter