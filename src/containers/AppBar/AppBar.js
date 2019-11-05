import { userActions } from '../../store/actions';
import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
    Box,
    Button,
    Collapsible,
    Heading,
    Layer
} from 'grommet';
import { Search, Menu, FormClose } from 'grommet-icons';

import SearchBar from '../SearchBar/SearchBar';
import UserAvatar from '../../components/UserProfile/UserAvatar';
import { PrivateLink, PrivateLinkMobile } from '../../components/PrivateLink/PrivateLink';

import styles from './AppBar.module.css';
import { Link } from 'react-router-dom';
import SizeComponent from '../../components/SizeComponent/SizeComponent';



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
            (<SizeComponent>
                {size => (
                size >= 600 ?
                <Box align='center' className={styles.header} >
                    <Box>
                        <Box
                            width='xxlarge'
                            tag='header'
                            direction='row'
                            align='center'
                            baseline='center'
                            style={{ zIndex: '1'}}
                            pad={{ horizontal: '17px'}}
                        >
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Heading className={styles.logo} level='1' margin='none' alignSelf='center'>Bookovsky</Heading>
                            </Link>

                            <Box align='center' flex='grow' height='auto' direction='row' justify='end'>
                                <Box>
                                    <Button icon={<Search></Search>} onClick={() => this.setState({showSidebar: !this.state.showSidebar})}></Button>
                                </Box>
                                <Collapsible direction="horizontal" open={showSidebar}>
                                    <SearchBar close={()=> this.setState({showSidebar: !this.state.showSidebar})}></SearchBar>
                                </Collapsible>
                            </Box>

                            <Box margin={{ vertical: 'xsmall' }}>
                                <UserAvatar logout={event => this.handleLogOut(event)} key={this.props.user.user.id} id={this.props.user.user.id} avatar={this.props.user.user.avatar} color='menuTextColor' name={this.props.user.user.username}></UserAvatar>
                            </Box>
                        </Box>

                        <Box
                            direction='row'
                            align='start'
                            baseline='center'
                            justify='start'
                            pad='0px'
                            style={{ zIndex: '10' }}
                        >   
                            <PrivateLink color='menuTextColor' to={`/user/${this.props.user.user.id}/library`} label='Мои книги' key='Мои книги' />
                            <PrivateLink color='menuTextColor' to='/history' label='История' key='История' />
                            <PrivateLink color='menuTextColor' to='/reader' label='Читатель' key='Читатель' />
                            <PrivateLink color='menuTextColor' to='/owner' label='Владелец' key='Владелец' />
                            <PrivateLink color='menuTextColor' to='/rules' label='Правила' key='Правила' />
                        </Box>
                    </Box>
                </Box>
                :
                <Box align='center' className={styles.header} >
                    <Box>
                        <Box
                            width='xxlarge'
                            tag='header'
                            direction='row'
                            align='center'
                            baseline='center'
                            style={{ zIndex: '1'}}
                            pad={{ horizontal: '17px'}}
                        >
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Heading className={styles.logo} level='1' margin='none' alignSelf='center'>Bookovsky</Heading>
                            </Link>

                            <Box align='center' flex='grow' height='auto' direction='row' justify='end'>
                                <Box>
                                    <Link to='/search'>
                                        <Button icon={<Search></Search>}></Button>
                                    </Link>
                                </Box>
                                <Button margin='-12px' icon={<Menu />} onClick={() => this.setState({showMenu: !this.state.showMenu})}></Button>
                            </Box>
                        </Box>

                        {this.state.showMenu &&
                        <Layer onClick={() => this.setState({showMenu: !this.state.showMenu})}>
                            <Box
                                background='background'
                                tag='header'
                                justify='end'
                                align='center'
                                direction='row'
                            >
                                <Button
                                    icon={<FormClose />}
                                    onClick={() => this.setState({ showMenu: false })}
                                />
                            </Box>
                            <Box
                                fill
                                background='background'
                                align='center'
                                justify='center'
                            >
                                <Box align='center' margin='15px'>
                                    <Link to={'/user/' + this.props.user.user.id} className={styles.avatar_container}>
                                        <img
                                            alt='Avatar'
                                            src={this.props.user.user.avatar}
                                            className={styles.small_avatar}
                                        />
                                    </Link>
                                    {this.props.user.user.username}
                                </Box>
                                <PrivateLinkMobile color='menuTextColor' to={`/user/${this.props.user.user.id}/library`} label='Мои книги' key='Мои книги'/>
                                <PrivateLinkMobile color='menuTextColor' to='/history' label='История' key='История'/>
                                <PrivateLinkMobile color='menuTextColor' to='/reader' label='Читатель' key='Читатель'/>
                                <PrivateLinkMobile color='menuTextColor' to='/owner' label='Владелец' key='Владелец'/>
                                <PrivateLinkMobile color='menuTextColor' to='/rules' label='Правила' key='Правила'/>
                                <PrivateLinkMobile color='menuTextColor' to='/settings' label='Настройки' key='Настройки'/>
                                <Box margin='15px' onClick={event => this.handleLogOut(event)}>ВЫЙТИ</Box>
                                <Link color='menuTextColor' to='/' onClick={event => this.handleLogOut(event)} label='Выйти' key='Выйти'/>
                            </Box>
                        </Layer>
                        }
                    </Box>
                </Box>
                )}
            </SizeComponent>)

            :
                
            (<SizeComponent>
            {size => (
                size >= 600 ?
                <Box align='center' className={styles.header} >
                    <Box>
                        <Box
                            width='xxlarge'
                            tag='header'
                            direction='row'
                            align='center'
                            baseline='center'
                            style={{ zIndex: '1'}}
                            pad={{ horizontal: '17px'}}
                        >
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Heading className={styles.logo} level='1' margin='none' alignSelf='center'>Bookovsky</Heading>
                            </Link>
                            
                            <Box align='center' flex='grow' height='auto' direction='row' justify='end'>
                                <Box>
                                    <Button icon={<Search></Search>} onClick={() => this.setState({showSidebar: !this.state.showSidebar})}></Button>
                                </Box>
                                <Collapsible direction="horizontal" open={showSidebar}>
                                    <SearchBar close={()=> this.setState({showSidebar: !this.state.showSidebar})}></SearchBar>
                                </Collapsible>

                                <PrivateLink color='menuTextColor' to='/rules' label='Правила' />
                                <PrivateLink color='menuTextColor' to='/login' label='Войти'></PrivateLink>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                :
                <Box align='center' className={styles.header} >
                    <Box>
                        <Box
                            width='xxlarge'
                            tag='header'
                            direction='row'
                            align='center'
                            baseline='center'
                            style={{ zIndex: '1'}}
                            pad={{ horizontal: '17px'}}
                        >
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Heading className={styles.logo} level='1' margin='none' alignSelf='center'>Bookovsky</Heading>
                            </Link>
                            
                            <Box align='center' flex='grow' height='auto' direction='row' justify='end'>
                                <Box>
                                    <Link to='/search'>
                                        <Button icon={<Search></Search>}></Button>
                                    </Link>
                                </Box>
                                <Box margin='-12px'>
                                <PrivateLink color='menuTextColor' to='/login' label='Войти'></PrivateLink>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                )}
            </SizeComponent>)
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