import React, { Component } from 'react';
import { Box } from 'grommet';
import styles from './UserPage.module.css';
import Book from '../../components/Books/Book'
import Scroll from '../../components/Scroll/Scroll'
import { connect } from 'react-redux';

import { userActions, libraryActions, wishlistActions } from '../../store/actions';
import ErrorPage from './../../components/Error/ErrorPage';
import { remote_url } from '../../helpers';

class UserPage extends Component {
    state = {
        user: {
            'lastName': '',
            'firstName': '',
            'username': '',
            'avatar': '',
            'id': this.props.match.params.id,
            'booksTaken': 0,
            'booksGiven': 0
        }
    }
    
    setUser() {
        return ({
            'lastName': this.props.user.user.last_name,
            'firstName': this.props.user.user.first_name,
            'username': this.props.user.user.django_user.username,
            'avatar': this.props.user.user.avatar ? this.props.user.user.avatar : remote_url.images.user_default,
            'id': this.props.match.params.id,
            'booksTaken': this.props.user.user.books_taken,
            'booksGiven': this.props.user.user.books_given
        });
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
        this.props.getBookList(this.props.match.params.id);
        if (this.props.user.userInfoRecieved) {
            const user = this.setUser()
            this.setState({user: user})
        }
        this.getWishlist();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.userInfoRecieved !== this.props.user.userInfoRecieved) {
            if (this.props.user.userInfoRecieved) {
                this.setState({user: this.setUser()})
            }
        }
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getUser(this.props.match.params.id);
            this.props.getBookList(this.props.match.params.id);
            if (this.props.user.userInfoRecieved) {
                this.setState({user: this.setUser()})
            }
        }
    }


    getWishlist() {
        this.props.getWishlist(this.props.match.params.id);
    }


    render() {
        let {user} = this.state;
        let library= [];
        let {wishlist} = [];

        if (this.props.library.userLibraryRecieved) {
            library = this.props.library.userLibrary;
        }

        if (this.props.wishlist.wishlistRecieved) {
            wishlist = this.props.wishlist.wishlist;
        }

        return (
            <Box width='xxlarge' direction='column' align='center' fill className={styles.profile}>
                {this.props.user.userInfoRecieved &&
                    <Box direction='column' align='center' fill className={styles.profile}>
                        <Box background='brandGradient' className={styles.background} align='center'>
                            <Box animation='slideUp'>
                                <img 
                                    alt='Remy Sharp'
                                    src={user.avatar}
                                    className={styles.big_avatar}
                                    onError={()=>{this.setState({user: {...user, avatar: remote_url.images.user_default}})}}
                                />
                            </Box>
                        </Box>
                        <h3 className={styles.header1}>{user.username}</h3>
                        <p className={styles.header2}>{user.lastName} {user.firstName}</p>
                        <Box margin='20px'  align='center'>
                            <p className={styles.text}>Книг было одолжено: {user.booksGiven}</p>
                            <p className={styles.text}>Книг было взято: {user.booksTaken}</p>
                        </Box>
                        {this.props.library.error &&
                            <Box></Box>
                        }
                        {this.props.library.userLibraryRecieved && this.props.library.userLibrary.length !== 0 &&
                            <Scroll object={(title, coverage, id) => <Book margin='4px' title={title} coverage={coverage} key={id} id={id}></Book>} 
                                objectList={library} 
                                header='Мои книги'
                                id={user.id}>
                            </Scroll>
                        }

                        {/* {this.props.wishlist.wishlistRecieved && this.props.wishlist.wishlist.length !== 0 &&
                            <Scroll object={(title, coverage, id) => <Book margin='4px' title={title} coverage={coverage} key={id} id={id}></Book>} 
                                objectList={wishlist} 
                                header='Мой вишлист'
                                id={user.id}>
                            </Scroll>
                        } */}
                    </Box>
                }

                {(this.props.alert.type === "alert-danger") && <ErrorPage alert={this.props.alert.message}></ErrorPage>}
                
            </Box>
        )
    }
}

const mapState = state => ({
    user: state.userpage,
    library: state.library,
    alert: state.alert, 
    wishlist: state.wishlist
})

const actionCreators = {
    logout: userActions.logout,
    getUser: userActions.getById,
    getBookList: libraryActions.getBookListById,
    getWishlist: wishlistActions.getWishlist
}

const connectedUserPage = connect(mapState, actionCreators)(UserPage);

export { connectedUserPage as UserPage };
