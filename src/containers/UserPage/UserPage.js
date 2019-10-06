import React, { Component } from 'react';
import { Box } from 'grommet';
import styles from './UserPage.module.css';
import Book from '../../components/Books/Book'
import Scroll from '../../components/Scroll/Scroll'
import { connect } from 'react-redux';

import { userActions } from '../../store/actions';


class UserPage extends Component {
    state = { user: {}, viewObjectsList: [] };

    componentDidMount() {
        const user = {
            'last_name': 'Ivanova',
            'first_name': 'Natalia',
            'email': 'ivanova.nv@phystech.edu',
            'django_user': {
                'username': 'CharlieLovegood'
            }};
        this.setState({ user: {
            'last_name': user.last_name,
            'first_name': user.first_name,
            'username': user.django_user.username
            }});
        this.setState({ viewObjectsList: [
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 1 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 2 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 3 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 }
        ] })
    }

    render() {
        console.log(this.props.user.user);
        return (
            <Box direction='column' align='center' fill className={styles.profile}>
                <Box  className={styles.background} align='center'>
                    <img
                        alt='Remy Sharp'
                        src='https://cdn.dribbble.com/users/1253590/screenshots/7221280/media/03e0c431c9196bdb0d32bbe5b030918c.png'
                        className={styles.big_avatar}
                    />
                </Box>
                <h3 className={styles.header1}>{this.props.user.username}</h3>
                <p className={styles.header2}>{this.state.user.last_name} {this.state.user.first_name}</p>
                <Scroll object={(title, coverage, id) => <Book title={title} coverage={coverage} key={id}></Book>} objectList={this.state.viewObjectsList} header='My Books'></Scroll>
                <Scroll object={(title, coverage, id) => <Book title={title} coverage={coverage} key={id}></Book>} objectList={this.state.viewObjectsList} header='My Books'></Scroll>
            </Box>
        )
    }
}

const mapState = state => ({
    user: state.authentication
})

const actionCreators = {
    logout: userActions.logout
}

export default connect(mapState, actionCreators)(UserPage);
