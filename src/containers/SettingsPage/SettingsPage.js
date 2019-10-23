import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Button } from 'grommet';
import styles from './SettingsPage.module.css';
import { userActions } from '../../store/actions';
import { connect } from 'react-redux';

import UserAvatar from './../../components/ImageUpload/ImageUpload';



class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                firstname: this.props.user.firstName, 
                lastname: this.props.user.lastName, 
                vkId: '',
                domitary: this.props.user.location,
                avatar: this.props.user.avatar
            },
            permission: true
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

    handleSubmit(event) {
        event.preventDefault();
        const user = {
            'first_name': this.state.user.firstname, 
            'last_name': this.props.user.lastName, 
            'vk': this.props.user.vkId,
            'location': this.props.user.domitary,
            'image': this.state.user.avatar
        };
          
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': 'Token ' + localStorage.token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };

        return fetch('/user/me/', requestOptions)
            .then(
                response => {
                    console.log(response);
                    return response;
                },
                error => {
                    console.log(error);
                });
    }

    handleImageChange(avatar) {
            const { user } = this.state;
            this.setState({user: {
                ...user,
                avatar: avatar
            }});
    }

    
    render() {
        const { user } = this.state;
        return (
            <Container component='main' maxWidth='xs'>
                <div className={styles.paper}>
                    <Typography variant='h6' gutterBottom>
                        Settings
                    </Typography>

                    <UserAvatar img={user.avatar} 
                                returnImage={(avatar) => this.handleImageChange(avatar)} 
                                handleImageUpload={event => this.handleImageUpload(event)}>
                    </UserAvatar>
                    
                    <Grid container spacing={3}>
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
                                id='lastname'
                                label='Last Name'
                                name='lastname'
                                autoComplete='lname'
                                value={user.lastname}
                                onChange={ event => this.handleChange(event) }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='domitary'
                                name='domitary'
                                label='Domitary'
                                fullWidth
                                autoComplete='domitary'
                                variant='outlined'
                                value={user.domitary}
                                onChange={ event => this.handleChange(event) }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='vkId'
                                name='vkId'
                                label='Vk ID'
                                fullWidth
                                autoComplete='vkId'
                                variant='outlined'
                                value={user.vkId}
                                onChange={ event => this.handleChange(event) }
                            />
                        </Grid>
                        <Button
                            type='submit'
                            fill='horizontal'
                            primary
                            color='brand'
                            label='Apply Changes'
                            onClick={event => this.handleSubmit(event)}
                            margin='12px'
                            required
                        >
                        </Button>
                    </Grid>
                </div>
            </Container>
        );
    }
}

const mapState = state => ({
    user: state.authentication.user
})

const actionCreators = {
    getUser: userActions.getById
}

export default connect(mapState, actionCreators)(SettingsPage);