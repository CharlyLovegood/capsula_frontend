import React, { Component } from 'react';
import { Box } from '@material-ui/core';


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
                <img src='https://cdn.dribbble.com/users/1322726/screenshots/5695684/dribbble-3.gif' alt='error 404'></img>
            </Box>
        )
    }
}

export default ErrorPage;