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

import * as axios from "axios";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            redirect: false,
            submitted: false };
    }

    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            url: '/auth/login/'
        };

        return axios(requestOptions)
            .then(resolve => {
                console.log(resolve);
                if (resolve.status === 200) {
                    const user = resolve.data;
                    localStorage.setItem('username', user.django_user.username);
                    localStorage.setItem('lastName', user.last_name);
                    localStorage.setItem('firstName', user.first_name);
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('avatar', user.image);
                    localStorage.setItem('location', user.location);
                    document.location.href = 'http://127.0.0.1:3000/';
                }
                if (resolve.status === 204) {
                }
            })
            .catch(error => console.log(error));
    }

    handleOauth(event) {
        console.log(event);
        document.location.href = 'http://127.0.0.1:8000/auth/login/vk-oauth2/';
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
                        Вход
                    </Typography>

                    {alert.message !== undefined ? (<div className={styles.error}>{alert.message}</div>) : <div></div>}

                    <ValidatorForm
                        ref="form"
                        onSubmit={(event) => this.handleSubmit(event)}
                        className={styles.form}
                    >
                        <Box alignContent='center'>
                            <TextValidator
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='username'
                                label='Имя пользователя'
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
                                label='Пароль'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                onChange={ event => this.handleChange(event) }
                            />
                        </Box>

                        
                        <div className={styles.submit}>
                        <img onClick={(event) => this.handleOauth(event)} className={styles.vk} src='https://image.flaticon.com/icons/svg/1216/1216744.svg'></img>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={submitted}
                                fullWidth
                            >
                                Войти
                            </Button>
                        </div>
                    </ValidatorForm>
                    <Grid container justify='flex-end'>
                        <PrivateLink color='textColor' to='/register' label="Зарегистрироваться"></PrivateLink>
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