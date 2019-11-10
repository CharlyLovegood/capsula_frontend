import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Button, Box } from 'grommet';
import styles from './SettingsPage.module.css';
import { userActions } from '../../store/actions';
import { connect } from 'react-redux';

import UserAvatar from './../../components/ImageUpload/ImageUpload';
import { StatusGood, StatusCritical } from 'grommet-icons';



class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                firstname: this.props.user.firstName, 
                lastname: this.props.user.lastName, 
                vkId: this.props.user.vk,
                domitary: this.props.user.location,
                avatar: this.props.user.avatar
            },
            permission: true,
            message: '',
            error: false
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
        let user;
        if (this.state.user.avatar !== this.props.user.avatar) {
            user = {
                'first_name': this.state.user.firstname, 
                'last_name': this.state.user.lastname, 
                'vk': this.state.user.vkId,
                'location': this.state.user.domitary,
                'image': this.state.user.avatar
            };
        }
        else {
            user = {
                'first_name': this.state.user.firstname, 
                'last_name': this.state.user.lastname, 
                'vk': this.state.user.vkId,
                'location': this.state.user.domitary
            };
        }
        
        this.props.editUser(user);
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
                    <h2 className={styles.header}>
                        Настройки
                    </h2>

                    {(this.props.alert.type === 'alert-success') &&
                        <Box margin='10px' round='10px' direction='row' gap='10px' pad='10px' border={{ color: 'status-ok', size: 'xsmall' }}>
                            <StatusGood color='status-ok'></StatusGood>
                            {this.props.alert.message}
                        </Box>
                    }


                    {(this.props.alert.type === 'alert-danger') &&
                        <Box margin='10px' round='10px' direction='row' pad='10px' gap='10px' border={{ color: 'status-critical', size: 'xsmall' }}>
                            <StatusCritical color='status-critical'></StatusCritical>
                            {this.props.alert.message}
                        </Box>
                    }
                    
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
                                label='Имя'
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
                                label='Фамилия'
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
                                label='Общежитие'
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
                            label='Сохранить'
                            onClick={event => this.handleSubmit(event)}
                            margin='12px'
                        >
                        </Button>
                    </Grid>
                </div>
            </Container>
        );
    }
}

const mapState = state => ({
    user: state.authentication.user,
    alert: state.alert
})

const actionCreators = {
    getUser: userActions.getById,
    editUser: userActions.editUser
}


const connectedSettingsPage = connect(mapState, actionCreators)(SettingsPage);

export { connectedSettingsPage as SettingsPage };