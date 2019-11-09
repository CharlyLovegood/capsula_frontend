import React, { Component } from 'react';
import { Box, Button, Text } from 'grommet';
import Element from './Element';
import Banner from './../Banner/Banner';
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

                    <Box className={styles.text_box} width='large' align='center'>
                        <Text size='30px' color='brandDark' textAlign='center' alignSelf='center'>Bookovsky - это сервис для обмена книгами</Text>
                        <Text size='30px' color='brandDark' textAlign='center' alignSelf='center'>Работает бесплатно и на доверии</Text>
                        <Text size='30px' color='brandDark' textAlign='center' alignSelf='center'>Найди новую книгу уже сегодня!</Text>
                    </Box>

                    <Box width={this.calculateWidth(size)} margin={{vertical: '40px'}} direction='row' wrap>
                        <Element key='1' width={this.calculateElementWidth(size)} icon={<Box width='100px' height='90px' className={styles.icon_book_shelf}></Box>} text='Добавляй свои книги'></Element>
                        <Element key='2' width={this.calculateElementWidth(size)} icon={<Box width='100px' height='90px' className={styles.icon_search}></Box>} text='Находи интересные книги'></Element>
                        <Element key='3' width={this.calculateElementWidth(size)} icon={<Box width='100px' height='90px' className={styles.icon_send}></Box>} text='Отправляй заявки'></Element>
                        <Element key='4' width={this.calculateElementWidth(size)} icon={<Box width='100px' height='90px' className={styles.icon_reading_book}></Box>} text='Открывай новые сюжеты'></Element>
                    </Box>
                    {this.props.library.found && !this.props.user.loggedIn &&
                        <Box align='center'>
                            <Box className={styles.gradient} align='center'>
                                <Gallery 
                                    object={(title, coverage, genre, author, id, idAbstract) => <BookItem margin='10px' author={author} title={title} coverage={coverage} key={idAbstract} id={idAbstract}></BookItem>} 
                                    objectList={this.props.library.search.searchResult.data.slice(0,10)}
                                    header={<Link to='search'><Text color='black' size='30px'>Доступные книги</Text></Link>}
                                    contentType='books'
                                ></Gallery>
                            </Box>
                            <Link to='/login'>
                                <Text color='#464141' size='16px'>Войди, чтобы увидеть больше...</Text>
                            </Link>
                        </Box>
                    } 
                    {this.props.library.found && this.props.user.loggedIn &&
                        <Box align='center'>
                            <Gallery 
                                object={(title, coverage, genre, author, id, idAbstract) => <BookItem margin='10px' author={author} title={title} coverage={coverage} key={idAbstract} id={idAbstract}></BookItem>} 
                                objectList={this.props.library.search.searchResult.data.slice(0,10)}
                                header={<a href='/search'><Text color='black' size='30px'>Доступные книги</Text></a>}
                                contentType='books'
                            ></Gallery>
                            <a href='/search'>
                                <Text color='#464141' size='16px'>Увидеть больше...</Text>
                            </a>
                        </Box>
                    } 
                </Box>
                }
            </SizeComponent>
        );
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
