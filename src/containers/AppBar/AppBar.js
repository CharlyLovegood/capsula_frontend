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

import SearchBar from '../SearchBar/SearchBar';
import UserAvatar from '../../components/UserProfile/UserAvatar';
import PrivateLink from '../../components/PrivateLink/PrivateLink';

import styles from './AppBar.module.css';
import { Link } from 'react-router-dom';



class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
            showMenu: false
        };
    }

    handleLogOut(event) {
        event.preventDefault();
        this.setState({ showSidebar: !this.state.showSidebar });
        this.props.logout();
    }

    render() {
        let showSidebar = this.state.showSidebar;
        return (    
            this.props.user.loggedIn === true ? 
            (<ResponsiveContext.Consumer>
                {size => (
                <Box align='center'>
                    <Box
                        direction='row'
                        align='center'
                        baseline='center'
                        justify='center'
                        pad='0px'
                        style={{ zIndex: '10' }}
                        className={styles.logo_container}
                    >   
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Heading className={styles.logo} level='3' margin='none' alignSelf='center'>Capsula</Heading>
                        </Link>
                    </Box>

                    <Box
                        width='900px'
                        tag='header'
                        direction='row'
                        align='center'
                        baseline='center'
                        justify='between'
                        style={{ zIndex: '1'}}
                        pad={{ horizontal: '-10px', vertical: 'xsmall' }}
                    >
                        <UserAvatar key={this.props.user.user.id} id={this.props.user.user.id} avatar={this.props.user.user.avatar} color='menuTextColor' name={this.props.user.user.username}></UserAvatar>
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
                                    elevation='xsmall'
                                    align='center'
                                    justify='center'
                                    height='200px'
                                    pad={{ left: 'small', right: 'small', vertical: 'xsmall' }}
                                    width='900px'
                                    className={styles.menu_container}
                                >
                                    <PrivateLink color='menuTextColor' to='/library' label='My books' />
                                    <PrivateLink color='menuTextColor' to='/history' label='History' />
                                    <PrivateLink color='menuTextColor' to='/swap' label='Swap' />
                                    <PrivateLink color='menuTextColor' to='/wishlist' label='Wishlist' />
                                    <PrivateLink color='menuTextColor' to='/search' label='Search' />
                                    <PrivateLink color='menuTextColor' to='/settings' label='Settings' />
                                    <Button className={styles.right_side_button} onClick={event => this.handleLogOut(event)} margin='medium' plain label='Log Out' />
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
                                    <PrivateLink color='menuTextColor' to='/library' label='My books' />
                                    <PrivateLink color='menuTextColor' to='/history' label='History' />
                                    <PrivateLink color='menuTextColor' to='/swap' label='Swap' />
                                    <PrivateLink color='menuTextColor' to='/wishlist' label='Wishlist' />
                                    <PrivateLink color='menuTextColor' to='/search' label='Search' />
                                    <Button onClick={event => this.handleLogOut(event)} margin='medium' plain label='Log Out' />
                                </Box>
                            </Layer>
                        )}
                    </Box>
                </Box>)}
            </ResponsiveContext.Consumer>)

            :
                
            (<ResponsiveContext.Consumer>
                {size => (
                <Box align='center'>
                    <Box
                        direction='row'
                        align='center'
                        baseline='center'
                        justify='center'
                        pad='0px'
                        style={{ zIndex: '1' }}
                        className={styles.logo_container}
                    >   
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Heading className={styles.logo} level='3' margin='none' alignSelf='center'>Capsula</Heading>
                        </Link>
                    </Box>

                    <Box
                        width='900px'
                        tag='header'
                        direction='row'
                        align='center'
                        baseline='center'
                        justify='between'
                        background='background'
                        pad={{ left: 'small', right: 'small', vertical: 'xsmall' }}
                    >

                        <Box direction='row' align='center'>
                            <PrivateLink color='menuTextColor' to='/login' label='Log In'></PrivateLink>
                        </Box>
                        

                        {this.state.showMenu && <Box margin={{ horizontal: 'small', vertical: 'xsmall' }}>
                            <Burger
                                onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
                                isOpen = {this.state.showSidebar}
                            />
                        </Box>} 




                    </Box>
{/* 
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
                                    <PrivateLink color='menuTextColor' to='/search' label='Search' />
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
                                    <PrivateLink color='menuTextColor' to='/search' label='Search' />
                                </Box>
                            </Layer>
                        )}
                    </Box> 
*/}
                </Box>)}
            </ResponsiveContext.Consumer>)
        );
    }
}


function mapState(state) {
    const user = state.authentication;
    return { user };
}

const actionCreators = {
    logout: userActions.logout
}

const connectedAppBar = connect(mapState, actionCreators)(AppBar);

export { connectedAppBar as AppBar };