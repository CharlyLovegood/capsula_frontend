import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { userActions } from '../../store/actions';
import { connect } from 'react-redux';


class RedirectPage extends Component  {
    componentDidMount() {
        this.props.oauth();
    }            

    render() {
        return(
            this.props.loggingIn.loggedIn ?
            <Redirect to={`/`} /> :
            <Redirect to={`/login`} />
        )
    }
}

const mapState = state => ({
    loggingIn: state.authentication,
    alert: state.alert
})

const actionCreators = {
    oauth: userActions.oauth,
};

export default connect(mapState, actionCreators)(RedirectPage);