import { userActions } from '../../store/actions';
import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
    Box,
    Button,
    Collapsible,
    Heading,
    Layer,
    ResponsiveContext
} from 'grommet';
import { FormClose } from 'grommet-icons';

import Burger from '@animated-burgers/burger-slip';
import '@animated-burgers/burger-slip/dist/styles.css' 

import SearchBar from '../../components/SearchBar/SearchBar';
import UserAvatar from '../../components/UserProfile/UserAvatar';
import PrivateLink from '../../components/PrivateLink/PrivateLink';

import styles from './AppBar.module.css';
import { Link } from 'react-router-dom';



class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
        };
    }

    handleLogOut(event) {
        event.preventDefault();
        this.setState({ showSidebar: !this.state.showSidebar });
        this.props.logout();
    }

    render() {
        const { showSidebar } = this.state;

        return (
            localStorage.getItem('user') ? 
            (<ResponsiveContext.Consumer>
                {size => (
                <Box>
                    <Box
                        tag='header'
                        direction='row'
                        align='center'
                        baseline='center'
                        justify='between'
                        background='background'
                        pad={{ left: 'small', right: 'small', vertical: 'xsmall' }}
                        style={{ zIndex: '1' }}
                    >
                        <UserAvatar name={this.props.token}></UserAvatar>

                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Heading className={styles.logo} level='3' margin='none' alignSelf='center'>Capsula</Heading>
                        </Link>
                        
                        <Box margin={{ horizontal: 'small', vertical: 'xsmall' }}>
                            <Burger
                                onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
                                isOpen = {this.state.showSidebar}
                            />
                        </Box>
                    </Box>

                    <Box flex direction='column' overflow={{ horizontal: 'hidden' }}>
                        {(!showSidebar || size !== 'small') ? (
                            <Collapsible direction='vertical' open={showSidebar}>
                                <Box
                                    flex
                                    direction='row'
                                    background='background'
                                    elevation='xsmall'
                                    align='center'
                                    justify='center'
                                    height='200px'
                                >
                                    <SearchBar></SearchBar>
                                    <PrivateLink to='/books' label='My books' />
                                    <PrivateLink to='/history' label='History' />
                                    <PrivateLink to='/swap' label='Swap' />
                                    <PrivateLink to='/friends' label='Friends' />
                                    <PrivateLink to='/wishlist' label='Wishlist' />
                                    <Button onClick={event => this.handleLogOut(event)} margin='medium' plain label='Log Out' />
                                </Box>
                            </Collapsible>
                        ): (
                            <Layer>
                                <Box
                                    background='background'
                                    tag='header'
                                    justify='end'
                                    align='center'
                                    direction='row'
                                >
                                    <Button
                                        icon={<FormClose />}
                                        onClick={() => this.setState({ showSidebar: false })}
                                    />

                                </Box>
                                <Box
                                    fill
                                    background='background'
                                    align='center'
                                    justify='center'
                                >
                                    <SearchBar></SearchBar>
                                    <Button href='/books' margin='medium' plain label='My books'></Button>
                                    <Button href='/history' margin='medium' plain label='History'></Button>
                                    <Button href='/swap' margin='medium' plain label='Swap'></Button>
                                    <Button href='/friends' margin='medium' plain label='Friends'></Button>
                                    <Button href='/wishlist' margin='medium' plain label='Wishlist'></Button>
                                </Box>
                            </Layer>
                        )}
                    </Box>
                </Box>)}
            </ResponsiveContext.Consumer>)

            :
                
            (<ResponsiveContext.Consumer>
                {size => (
                <Box>
                    <Box
                        tag='header'
                        direction='row'
                        align='center'
                        baseline='center'
                        justify='between'
                        background='background'
                        pad={{ left: 'small', right: 'small', vertical: 'xsmall' }}
                        style={{ zIndex: '1' }}
                    >
                        <Box direction='row'>
                            <Button href='/login' margin='medium' plain label='Log In'></Button>
                            <Button href='/register' margin='medium' plain label='Register'></Button>
                        </Box>

                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Heading className={styles.logo} level='3' margin='none' alignSelf='center'>Capsula</Heading>
                        </Link>
                        
                        <Box margin={{ horizontal: 'small', vertical: 'xsmall' }}>
                            <Burger
                                onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
                                isOpen = {this.state.showSidebar}
                            />
                        </Box>
                    </Box>

                    <Box flex direction='column' overflow={{ horizontal: 'hidden' }}>
                        {(!showSidebar || size !== 'small') ? (
                            <Collapsible direction='vertical' open={showSidebar}>
                                <Box
                                    flex
                                    direction='row'
                                    background='background'
                                    elevation='xsmall'
                                    align='center'
                                    justify='center'
                                    height='200px'
                                >
                                    <SearchBar></SearchBar>
                                </Box>
                            </Collapsible>
                        ): (
                            <Layer>
                                <Box
                                    background='background'
                                    tag='header'
                                    justify='end'
                                    align='center'
                                    direction='row'
                                >
                                    <Button
                                        icon={<FormClose />}
                                        onClick={() => this.setState({ showSidebar: false })}
                                    />

                                </Box>
                                <Box
                                    fill
                                    background='background'
                                    align='center'
                                    justify='center'
                                >
                                    <SearchBar></SearchBar>
                                </Box>
                            </Layer>
                        )}
                    </Box>
                </Box>)}
            </ResponsiveContext.Consumer>)
        );
    }
}


function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const actionCreators = {
    logout: userActions.logout
}

export default connect(mapState, actionCreators)(AppBar);