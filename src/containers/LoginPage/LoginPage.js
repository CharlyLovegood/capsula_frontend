import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import BoxUI from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import styles from './LogIn.module.css';

import { connect } from 'react-redux';
import { PrivateLink } from '../../components/PrivateLink/PrivateLink';
import { userActions } from '../../store/actions';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { urls } from './../../helpers';
import { Box } from 'grommet';
import { StatusGood, StatusCritical } from 'grommet-icons';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            redirect: false,
            submitted: false };
    }

    handleOauthVk(event) {
        document.location.href = urls.backOauthVk;
    }
    
    handleOauthGoogle(event) {
        document.location.href = urls.backOauthGoogle;
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
                    <Typography component='h1' variant='h5'>
                        Вход
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
                        <BoxUI alignContent='center'>
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
                        </BoxUI>

                        
                        <div className={styles.submit}>
                        <Box direction='row'>
                            <img alt='vk' onClick={(event) => this.handleOauthVk(event)} className={styles.vk} src='https://image.flaticon.com/icons/svg/1216/1216744.svg'></img>
                            <img alt='google' onClick={(event) => this.handleOauthGoogle(event)} className={styles.google} src='https://image.flaticon.com/icons/svg/281/281764.svg'></img>
                        </Box>
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
    oauth: userActions.oauth,
};

export default connect(mapState, actionCreators)(LoginPage);