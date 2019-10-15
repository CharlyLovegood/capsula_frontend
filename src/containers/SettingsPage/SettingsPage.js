import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Button } from 'grommet';
import UserAvatar from './../../components/UserProfile/SettingsAvatar';
import styles from './SettingsPage.module.css';
import { userActions } from '../../store/actions';
import { connect } from 'react-redux';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                firstname: this.props.user.firstName, 
                lastname: this.props.user.lastName, 
                vkId: '',
                domitary: '',
                avatar: 'https://cdn.dribbble.com/users/1253590/screenshots/7221280/media/03e0c431c9196bdb0d32bbe5b030918c.png'
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
    }


    readFile(file) {
        let fileReader = new FileReader();

        return new Promise((resolve, reject) => {
                fileReader.onload = e => {
                        let dataURI = e.target.result;
                        resolve(dataURI);
                }
                fileReader.onerror = () => reject('Ошибка чтения файла');
                fileReader.readAsDataURL(file); 
        })
    }; 

    fileUpload(event) {
        return new Promise((resolve, reject) => {
            event.preventDefault();
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            let extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
                this.readFile(file).then( function(result) {
                    resolve(result); 
                });
            }
            else {
                resolve(file.name);
            }
        })
    };

    handleImageUpload(event) {
        this.fileUpload(event).then((result) => { 
            const { user } = this.state;
            this.setState({user: {
                ...user,
                avatar: result
            }});
        });
    }
    
    render() {
        const { user } = this.state;

        return (
            <Container component='main' maxWidth='xs'>
                <div className={styles.paper}>
                    <Typography variant="h6" gutterBottom>
                        Settings
                    </Typography>

                    <UserAvatar img={user.avatar} handleImageUpload={event => this.handleImageUpload(event)}></UserAvatar>
                    
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
                                id="domitary"
                                name="domitary"
                                label="Domitary"
                                fullWidth
                                autoComplete="domitary"
                                variant="outlined"
                                value={user.domitary}
                                onChange={ event => this.handleChange(event) }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="vkId"
                                name="vkId"
                                label="Vk ID"
                                fullWidth
                                autoComplete="vkId"
                                variant="outlined"
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