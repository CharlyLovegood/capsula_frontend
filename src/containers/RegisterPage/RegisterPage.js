import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './RegisterPage.module.css';
import Button from '@material-ui/core/Button';


import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { userActions } from '../../store/actions';
import { urls } from './../../helpers';
import { Box } from 'grommet';

import { StatusGood, StatusCritical } from 'grommet-icons';



class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                firstname: '', 
                lastname:'', 
                username: '', 
                email: '', 
                password: '', 
                repeatPassword: ''
            },
            submitted: false};
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { user } = this.state;
            if (value !== user.password) {
                return false;
            }
            return true;
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        this.props.register(user);
    }


    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleOauthVk(event) {
        document.location.href = urls.backOauthVk;
    }
    
    handleOauthGoogle(event) {
        document.location.href = urls.backOauthGoogle;
    }


    render() {
        const { user, submitted } = this.state;
        const { alert  } = this.props;

        return (
            <Container component='main' maxWidth='xs'>
                <div className={styles.paper}>
                    <Typography component='h1' variant='h5' >
                        Регистрация
                    </Typography>

                    {(alert.type === 'alert-success') &&
                        <Box margin='10px' round='10px' direction='row' gap='10px' pad='10px' border={{ color: 'status-ok', size: 'xsmall' }}>
                            <StatusGood color='status-ok'></StatusGood>
                            {alert.message}
                        </Box>
                    }

                    {(alert.type === 'alert-danger') &&
                        <Box margin='10px' round='10px' direction='row' pad='10px' gap='10px' border={{ color: 'status-critical', size: 'xsmall' }}>
                            <StatusCritical color='status-critical'></StatusCritical>
                            {alert.message}
                        </Box>
                    }

                    <ValidatorForm
                        ref="form"
                        onSubmit={(event) => this.handleSubmit(event)}
                        className={styles.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    autoFocus
                                    required
                                    fullWidth
                                    variant='outlined'
                                    name='firstname'
                                    id='firstname'
                                    label='Имя'
                                    value={user.firstname}
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    variant='outlined'
                                    name='lastname'
                                    id='lastname'
                                    label='Фамилия'
                                    value={user.lastname}
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    variant='outlined'
                                    name='username'
                                    id='username'
                                    label='Имя пользователя'
                                    value={user.username}
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    required
                                    fullWidth
                                    variant='outlined'
                                    name='email'
                                    id='email'
                                    label='Email'
                                    value={user.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    onChange={event => this.handleChange(event)}
                                />
                            </Grid>            
                            <Grid item xs={12}>
                                <TextValidator
                                    required
                                    fullWidth
                                    variant='outlined'
                                    name='password'
                                    id='password'
                                    label='Пароль'
                                    value={user.password}
                                    type='password'
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    fullWidth
                                    required
                                    variant='outlined'
                                    name='repeatPassword'
                                    id='repeatPassword'
                                    label='Подтверждение пароля'
                                    value={user.repeatPassword}
                                    type='password'
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['password mismatch', 'this field is required']}
                                    onChange={ event => this.handleChange(event) }
                                />
                            </Grid>
                            <div className={styles.submit}>
                                <Box direction='row'>
                                    <img alt='vk' onClick={(event) => this.handleOauthVk(event)} className={styles.vk} src='https://image.flaticon.com/icons/svg/1216/1216744.svg'></img>
                                    <img alt='google' onClick={(event) => this.handleOauthGoogle(event)} className={styles.google} src='https://image.flaticon.com/icons/svg/281/281764.svg'></img>
                                </Box>
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={submitted}
                                >
                                    {(submitted && 'Your form is submitted!')
                                        || (!submitted && 'Зарегистрироваться')
                                    }
                                </Button>
                            </div>
                        </Grid>
                    </ValidatorForm>

                    <Grid container justify='flex-end'>                        
                        <p>Уже есть аккаунт?</p>
                        <Link className={styles.register} to='/login'> 
                            <p>Войти</p>
                        </Link>
                    </Grid>
                </div>
            </Container>
        );
    }
}


const mapState = state => ({
    registering: state.registration,
    alert: state.alert
})

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);

export { connectedRegisterPage as RegisterPage };
