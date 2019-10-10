import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from 'grommet';

import styles from './LogIn.module.css';

import { connect } from 'react-redux';
import PrivateLink from '../../components/PrivateLink/PrivateLink';
import { userActions } from '../../store/actions';



class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            error: false };
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const {alert} = this.props;

        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Log in
                    </Typography>

                    {alert.message !== undefined ? (<div className={styles.error}>{alert.message.message}</div>) : <div></div>}

                    <form className={styles.form} noValidate>
                        {!this.state.error ? (
                            <Box>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='username'
                                    label='User Name'
                                    name='username'
                                    autoComplete='username'
                                    autoFocus
                                    value={this.state.username}
                                    onChange={ event => this.handleChange(event) }
                                />
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Box>
                            ): (
                            <Box>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    error
                                    fullWidth
                                    id='username'
                                    label='User Name'
                                    name='username'
                                    autoComplete='username'
                                    autoFocus
                                    onChange={ event => this.handleChange(event) }
                                />
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    error
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Box>
                            )}
                        <Button
                            round='none'
                            primary
                            variant='contained'
                            color='brand'
                            fill='horizontal'
                            className={styles.submit}
                            label='Sign In'
                            onClick={event => this.handleSubmit(event)}
                        >
                        </Button>
                        <Grid container>
                            <PrivateLink color='textColor' to='/register' label="Don't have an account? Register"></PrivateLink>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapState = state => ({
    loggingIn: state.authentication,
    alert: state.alert
})

const actionCreators = {
    login: userActions.login,
};

export default connect(mapState, actionCreators)(LoginPage);