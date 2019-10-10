import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './RegisterPage.module.css';
import { Button } from 'grommet';


import { connect } from 'react-redux';

import { userActions } from '../../store/actions';
import PrivateLink from '../../components/PrivateLink/PrivateLink';



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
        const { alert  } = this.props;

        return (
            <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Register
                </Typography>

                {alert.message !== undefined ? (<div className={styles.error}>{alert.message.message}</div>) : <div></div>}
                
                <form className={styles.form}>
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
                </Grid>
                <div className={styles.submit}>
                    <Button
                        type='submit'
                        fill='horizontal'
                        primary
                        color='brand'
                        label='Sign Up'
                        onClick={event => this.handleSubmit(event)}
                    >
                        
                    </Button>
                </div>

                <Grid container justify='flex-end'>
                    <PrivateLink color='textColor' to='/login' label='Already have an account? Log in' />
                </Grid>
                </form>
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

export default connect(mapState, actionCreators)(RegisterPage);
