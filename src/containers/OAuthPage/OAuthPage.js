import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text } from 'grommet';
import styles from './OAuthPage.module.css';
import { userActions } from '../../store/actions';
import { connect } from 'react-redux';

import * as axios from "axios";
import { remote_url } from '../../helpers';
import { Box } from 'grommet';


class OAuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '', 
                lastName: '',
                firstName: '',
                avatar: ''
            }
        };
        
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

    
    render() {
        const {user} = this.state;

        return (
            <Box align='center'>
                <Box gap='10px'>
                    <Box animation='slideUp'>
                        <img 
                            alt='Remy Sharp'
                            src={user.avatar}
                            className={styles.big_avatar}
                            onError={()=>{this.setState({user: {...user, avatar: remote_url.images.user_default}})}}
                        />
                    </Box>
                    <Text>Вы вошли под именем... {user.username}</Text>
                    <Link to='/settings'>
                        <Button
                            type='submit'
                            fill='horizontal'
                            primary
                            color='brand'
                            label='Перейти к настройкам'
                        >
                        </Button>
                    </Link>
                    
                    <Link to='/'>
                        <Button
                            type='submit'
                            fill='horizontal'
                            color='brand'
                            label='На главную'
                        >
                        </Button>
                    </Link>
                </Box>
            </Box>
        );
    }
}

const mapState = state => ({
    user: state.authentication.user
})

const actionCreators = {
    login: userActions.login
}

export default connect(mapState, actionCreators)(OAuthPage);