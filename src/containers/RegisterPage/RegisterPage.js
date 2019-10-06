import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './RegisterPage.module.css';


import { connect } from 'react-redux';

import { userActions } from '../../store/actions';


function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                firstname: '', 
                secondname:'', 
                username: '', 
                email: '', 
                password: '', 
                passwordcopy: ''
            },
            permission: true};
    }

    
    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        if (user.password === user.passwordcopy) {
            this.props.register(user);
        } else {
            this.setState({permission: false});
        }
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
        this.setState({permission: true});
    }


    render() {
        const { user, permission } = this.state;

        return (
            <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form className={styles.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            autoComplete='fname'
                            name='firstname'
                            variant='outlined'
                            required
                            fullWidth
                            id='firstname'
                            label='First Name'
                            autoFocus
                            value={user.firstname}
                            onChange={ event => this.handleChange(event) }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            autoComplete='lname'
                            value={user.lastName}
                            onChange={ event => this.handleChange(event) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='username'
                            label='User Name'
                            name='username'
                            autoComplete='username'
                            value={user.username}
                            onChange={ event => this.handleChange(event) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            value={user.email}
                            onChange={ event => this.handleChange(event) }
                        />
                    </Grid>            
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={user.password}
                            onChange={ event => this.handleChange(event) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                    {permission ?
                        <TextField
                            color='red'
                            variant='outlined'
                            required
                            fullWidth
                            name='passwordcopy'
                            label='Confirm Password'
                            type='password'
                            id='passwordcopy'
                            autoComplete='passwordcopy'
                            value={user.passwordcopy}
                            onChange={ event => this.handleChange(event) }
                        />
                        :
                        <TextField
                            color='red'
                            variant='outlined'
                            error='false'
                            fullWidth
                            helperText='Passwords do not match'
                            name='passwordcopy'
                            label='Confirm Password'
                            type='password'
                            id='passwordcopy'
                            autoComplete='passwordcopy'
                            value={user.passwordcopy}
                            onChange={ event => this.handleChange(event) }
                        />
                    }
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value='allowExtraEmails' color='primary' />}
                        label='I want to receive inspiration, marketing promotions and updates via email.'
                    />
                    </Grid>
                </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={styles.submit}
                        onClick={event => this.handleSubmit(event)}
                    >
                        Sign Up
                    </Button>
                <Grid container justify='flex-end'>
                    <Grid item>
                    <Link href='#' variant='body2'>
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            </Container>
        );
    }
}


function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

export default connect(mapState, actionCreators)(RegisterPage);
