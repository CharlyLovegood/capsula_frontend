import React, { Component } from 'react';
import { Box, Button, Text } from 'grommet';
import Element from './Element';
import Banner from './../Banner/Banner';
import Scroll from './../Scroll/Scroll';
import { connect } from 'react-redux';
import BookItem from '../../components/Books/Book'
import { searchActions } from '../../store/actions';
import styles from './HomePage.module.css';
import SizeComponent from '../SizeComponent/SizeComponent';
import Gallery from './../Gallery/Gallery';
import {Link} from 'react-router-dom';


class HomePage extends Component {
    componentDidMount() {
        this.props.request();
    }

    calculateWidth(size) {
        if (size >= 1000) return 'xxlarge'
        else if (size >= 800) return 'xlarge'
        else if (size >= 600) return 'large'
        else if (size >= 424) return 'medium'
        else return '280px'
    }


    calculateElementWidth(size) {
        if (size >= 1000) return '230px'
        else if (size >= 800) return '180px'
        else if (size >= 600) return '280px'
        else if (size >= 424) return '180px'
        else if (size >= 200) return '120px'
        else return '180px'
    }
    
    render() {
        if (this.props.library.found) {
            return (
                <SizeComponent>
                    {size => 
                    <Box width='xxlarge' align='center'>
                        {size >= 600 &&
                            <Banner user={this.props.user}></Banner>
                        }
                        {size < 600 &&
                            <Banner size='small' user={this.props.user}></Banner>
                        }
                        <Box width={this.calculateWidth(size)} margin={{vertical: '70px'}} direction='row' wrap>
                            <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_book_shelf}></Box>} text='Добавляй свои книги'></Element>
                            <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_search}></Box>} text='Находи интересные книги'></Element>
                            <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_send}></Box>} text='Отправляй заявки на обмен'></Element>
                            <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_reading_book}></Box>} text='Получай то, что искал'></Element>
                        </Box>
                        {this.props.library.found && !this.props.user.loggedIn &&
                        // <Scroll object={(title, coverage, id) => <BookItem margin='4px' title={title} coverage={coverage} key={id} id={id}></BookItem>} 
                        //     objectList={this.props.library.search.searchResult.data} 
                        //     header='Доступные книги'
                        //     id={1}>
                        // </Scroll>
                            <Box align='center'>
                                <Gallery 
                                    object={(title, coverage, genre, author, id, idAbstract) => <BookItem margin='10px' title={title} coverage={coverage} key={id} id={idAbstract}></BookItem>} 
                                    objectList={this.props.library.search.searchResult.data.slice(0,10)}
                                    header='Доступные книги'
                                    contentType='books'
                                ></Gallery>
                                <Text color='#b3a7a7' size='16px'>Войди, чтобы увидеть больше...</Text>
                                <Box align='center' margin={{vertical: '20px'}}>
                                    <Link color='textColor' to='/login'>
                                        <Button margin={{vertical:'5px'}} label={<Text size='23px' color='brand'>Войти</Text>}></Button>
                                    </Link>
                                </Box>
                            </Box>
                        } 
                        {this.props.library.found && this.props.user.loggedIn &&
                        // <Scroll object={(title, coverage, id) => <BookItem margin='4px' title={title} coverage={coverage} key={id} id={id}></BookItem>} 
                        //     objectList={this.props.library.search.searchResult.data} 
                        //     header='Доступные книги'
                        //     id={1}>
                        // </Scroll>
                            <Box align='center'>
                                <Gallery 
                                    object={(title, coverage, genre, author, id, idAbstract) => <BookItem margin='10px' title={title} coverage={coverage} key={idAbstract} id={idAbstract}></BookItem>} 
                                    objectList={this.props.library.search.searchResult.data.slice(0,10)}
                                    header='Доступные книги'
                                    contentType='books'
                                ></Gallery>
                                <Box align='center' margin={{vertical: '20px'}}>
                                    <Link color='textColor' to='/search'>
                                        <Button margin={{vertical:'5px'}} label={<Text size='23px' color='brand'>Найти книгу</Text>}></Button>
                                    </Link>
                                </Box>
                            </Box>
                        } 
                    </Box>
                    }
                </SizeComponent>
            );
        } else {
            return(<SizeComponent>
                {size => 
                <Box align='center'>
                    {size >= 600 &&
                        <Banner user={this.props.user}></Banner>
                    }
                    {size < 600 &&
                        <Banner size='small' user={this.props.user}></Banner>
                    }
                    <Box width={this.calculateWidth(size)} margin={{vertical: '30px'}} direction='row' wrap>
                        <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_book_shelf}></Box>} text='Добавляй свои книги'></Element>
                        <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_search}></Box>} text='Находи интересные тебе книги'></Element>
                        <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_send}></Box>} text='Отправляй заявки на обмен'></Element>
                        <Element width={this.calculateElementWidth(size)} icon={<Box width='100px' height='100px' className={styles.icon_reading_book}></Box>} text='Получай то, что искал'></Element>
                    </Box>
                </Box>
                }
            </SizeComponent>)
        }
    }
}

const mapState = state => ({
    library: state.search,
    user: state.authentication
});

const actionCreators = {
    request: searchActions.request
};

export default connect(mapState, actionCreators)(HomePage);
