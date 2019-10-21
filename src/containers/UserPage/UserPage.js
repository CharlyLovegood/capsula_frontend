import React, { Component } from 'react';
import { Box } from 'grommet';
import styles from './UserPage.module.css';
import Book from '../../components/Books/Book'
import Scroll from '../../components/Scroll/Scroll'
import { connect } from 'react-redux';

import { userActions, libraryActions } from '../../store/actions';
import ErrorPage from './../../components/Error/ErrorPage';

class UserPage extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
        this.props.getBookList(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getUser(this.props.match.params.id);
            this.props.getBookList(this.props.match.params.id);
        }
    }
    render() {
        let user= {};
        let library= [];

        if (this.props.user.userInfoRecieved) {
            user = {
                'lastName': this.props.user.user.last_name,
                'firstName': this.props.user.user.first_name,
                'username': this.props.user.user.django_user.username,
                'avatar': this.props.user.user.image
            };
        }
        if (this.props.library.userLibraryRecieved) {
            library = this.props.library.userLibrary;
        }

        return (
            <Box direction='column' align='center' fill className={styles.profile}>
                {this.props.user.userInfoRecieved &&
                    <Box direction='column' align='center' fill className={styles.profile}>
                        <Box background='brandGradient' className={styles.background} align='center'>
                            <Box animation='slideUp'>
                                <img 
                                    alt='Remy Sharp'
                                    src={localStorage.getItem('avatar')}
                                    className={styles.big_avatar}
                                />
                            </Box>
                        </Box>
                        <h3 className={styles.header1}>{user.username}</h3>
                        <p className={styles.header2}>{user.lastName} {user.firstName}</p>
                        {this.props.library.error &&
                            <ErrorPage alert={this.props.alert}></ErrorPage>
                        }
                        {this.props.library.error &&
                            <Box></Box>
                        }
                        {this.props.library.userLibraryRecieved &&
                            <Scroll object={(title, coverage, id) => <Book title={title} coverage={coverage} key={id} id={id}></Book>} 
                                    objectList={library} 
                                    header='My Books'>
                            </Scroll>
                        }
                    </Box>
                }

                {this.props.user.error &&
                    <ErrorPage alert={this.props.alert}></ErrorPage>
                }
            </Box>
        )
    }
}

const mapState = state => ({
    user: state.userpage,
    library: state.library,
    alert: state.alert
})

const actionCreators = {
    logout: userActions.logout,
    getUser: userActions.getById,
    getBookList: libraryActions.getBookListById
}

export default connect(mapState, actionCreators)(UserPage);
