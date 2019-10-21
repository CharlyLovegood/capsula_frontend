import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { remote_url } from './../../helpers';


class ErrorPage extends Component {

    render() {

        return (
            <Box 
                direction='column'                          
                align='center'
                baseline='center'
                justify='center'
            >
                <h3>Error</h3>
                <p>{this.props.alert.message ? this.props.alert.message.response.data.msg : ''}</p>
                <img src={remote_url.images.error} alt='error 404'></img>
            </Box>
        )
    }
}

export default ErrorPage;