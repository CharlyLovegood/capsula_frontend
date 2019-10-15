import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import styles from './LogIn.module.css';

import { connect } from 'react-redux';
import PrivateLink from '../../components/PrivateLink/PrivateLink';
import { userActions } from '../../store/actions';


import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            submitted: false };
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
        const { submitted } = this.state;
        const {alert} = this.props;

        return (
            <Container component='main' maxWidth='xs'>
                <div className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Log in
                    </Typography>

                    {alert.message !== undefined ? (<div className={styles.error}>{alert.message.message}</div>) : <div></div>}

                    <ValidatorForm
                        ref="form"
                        onSubmit={(event) => this.handleSubmit(event)}
                        className={styles.form}
                    >
                        <Box>
                            <TextValidator
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
                            <TextValidator
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
                            
                        <div className={styles.submit}>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={submitted}
                                fullWidth
                            >
                                Log In
                            </Button>
                        </div>
                    </ValidatorForm>

                    <Grid container justify='flex-end'>
                        <PrivateLink color='textColor' to='/register' label="Don't have an account? Register"></PrivateLink>
                    </Grid>
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