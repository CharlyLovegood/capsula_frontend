import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, 
    Button, 
    Heading, 
    Text, 
    Select, 
    // Tab, 
    // Tabs 
} from 'grommet';
import TextField from '@material-ui/core/TextField';
import BookImage from './../ImageUpload/ImageUpload';
import {genresArray2, genres} from './../../helpers'

import { remote_url } from './../../helpers';
import styles from './Book.module.css';
import { StatusCritical } from 'grommet-icons';



class AddNewBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: '', 
            author:'',
            genre: 'Жанр',
            genre_code: '',
            image: remote_url.images.add_new_book_default,
            ISBN: '',
            api_image: '',
            api_bookName: '',
            api_author: '',
            alert: false,
            message: ''
        };
    }

    handleAuthorChange(event) {
        this.setState({author: event.target.value, alert: false});
    }

    handleBookNameChange(event) {
        this.setState({bookName: event.target.value, alert: false});
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value, alert: false });
    }

    SetISBN(event) {
        const isbn = event.target.value;
        this.setState({ ISBN: isbn, alert: false });

        if (isbn !== '') {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:` + encodeURIComponent(isbn))
            .then((response)=> response.json())
            .then((responseData)=> {
                
                if (responseData.totalItems !== 0) {
                    this.setState({
                        api_image: responseData.items[0].volumeInfo.imageLinks.thumbnail,
                        api_bookName: responseData.items[0].volumeInfo.title,
                        api_author: responseData.items[0].volumeInfo.authors[0]
                    })
                }

                                
                if (responseData.totalItems === 0 && this.state.api_image !== '') {
                    this.setState({
                        api_image: remote_url.images.add_new_book_default,
                        api_bookName: '',
                        api_author: ''
                    })
                }
            });
        }
    }

    handleSubmit() {
        let book = {};
        const {bookName, genre_code, author} = this.state;
        console.log(bookName, genre_code, author)

        if (bookName !== '' && genre_code !== '' && author !== '') {
            if (this.state.image === remote_url.images.add_new_book_default) {
                book = {
                    'title': this.state.bookName,
                    'authors': this.state.author,
                    'genre': this.state.genre_code
                };
            } else {
                book = {
                    'title': this.state.bookName,
                    'authors': this.state.author,
                    'genre': this.state.genre_code,
                    'image': this.state.image 
                };
            }
            this.props.handleAddNewBook(book);
            this.props.onClose();
        } else if (bookName !== '' && author !== '') {
            this.setState({message: 'Заполните жанр', alert: true});
        } else if (genre_code !== '' && author !== '') {
            this.setState({message: 'Заполните название', alert: true});
        } else if (genre_code !== '' && bookName !== '') {
            this.setState({message: 'Заполните автора', alert: true});
        } else {
            this.setState({message: 'Заполните недостающие поля', alert: true});
        }
    }

    handleSubmitISBN() {
        let book = {};
        const {api_bookName, genre_code, api_author} = this.state;
        console.log(api_bookName, genre_code, api_author)
        if (api_bookName !== '' && genre_code !== 0 && api_author !== '') {
            if (this.state.api_image === remote_url.images.add_new_book_default) {
                book = {
                    'title': this.state.api_bookName,
                    'authors': this.state.api_author,
                    'genre': this.state.genre_code
                };
            } else {
                book = {
                    'title': this.state.api_bookName,
                    'authors': this.state.api_author,
                    'genre': this.state.genre_code,
                    'image': this.state.api_image 
                };
            }
            this.props.handleAddNewBook(book);
            this.props.onClose();

        } else if (api_bookName !== '' && api_author !== '') {
            this.setState({message: 'Заполните жанр', alert: true});
        } else if (genre_code !== 0 && api_author !== '') {
            this.setState({message: 'Заполните название', alert: true});
        } else if (genre_code !== 0 && api_bookName !== '') {
            this.setState({message: 'Заполните автора', alert: true});
        } else {
            this.setState({message: 'Заполните недостающие поля', alert: true});
        }
    }

    setValue(genre) {
        this.setState({genre_code: genres[genre]});
        this.setState({genre: genre});
    }

    handleImageChange(image) {
        this.setState({image: image});
    }

    render() {
        const {alert, message} = this.state;
        return (
            <Box pad='medium' gap='small' width='medium' align='center' fill pad='10px'>
                <Box align='center' className={styles.scroll_container} pad='10px'>
                    <Heading textAlign='center' level={3} margin='none'>
                        Добавить книгу
                    </Heading>

                    {(alert) &&
                        <Box justify='center' align='center' margin='10px' round='10px' direction='row' pad='10px' gap='10px' border={{ color: 'status-critical', size: 'xsmall' }}>
                            <StatusCritical color='status-critical'></StatusCritical>
                            {message}
                        </Box>
                    }

                    {/* <Tabs> */}
                        {/* <Tab title='Вручную'> */}
                            <Box className={styles.scroll_page}>
                                <BookImage shape='square' img={this.state.image} returnImage={(image) => this.handleImageChange(image)}></BookImage>
                                <Text>Обложка</Text>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='bookname'
                                    label='Название книги'
                                    name='bookname'
                                    autoComplete='bookname'
                                    autoFocus
                                    value={this.state.bookName}
                                    onChange={ event => this.handleBookNameChange(event) }>
                                </TextField>                
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='author'
                                    label='Автор (Фамилия И.О.)'
                                    name='author'
                                    value={this.state.author}
                                    onChange={ event => this.handleAuthorChange(event) }>
                                </TextField>
                                <Box fill='horizontal'>
                                    <Select options={genresArray2} value={this.state.genre} onChange={({ option }) => this.setValue(option)} />
                                </Box>
                                <Box
                                    as='footer'
                                    gap='small'
                                    direction='row'
                                    align='center'
                                    justify='end'
                                    pad={{ top: 'medium', bottom: 'small' }}
                                >
                                    <Link to='#'>
                                        <Button  primary label={
                                            <Text color='white'>
                                                <strong>Да</strong>
                                            </Text>
                                        } color='brand' onClick={event => this.handleSubmit(event)}/>
                                    </Link>
                                    <Button
                                        label='Нет'
                                        onClick={this.props.onClose}
                                    />
                                </Box>
                            </Box>
                        {/* </Tab>
                        <Tab title='ISBN - код'>
                            <Box className={styles.scroll_page}>

                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='ISBN'
                                    label='ISBN-код'
                                    name='ISBN'
                                    autoComplete='ISBN'
                                    autoFocus
                                    onChange={ event => this.SetISBN(event) }>
                                </TextField>                

                                <Text>Обложка</Text>

                                <BookImage shape='square' img={this.state.api_image} returnImage={(image) => this.handleImageChange(image)}></BookImage>

                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='api_bookName'
                                    label='Название книги'
                                    InputLabelProps={{shrink: true}}
                                    value={this.state.api_bookName}
                                    name='api_bookName'
                                    autoFocus
                                    onChange={ event => this.handleChange(event) }>
                                </TextField> 

                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='api_author'
                                    InputLabelProps={{shrink: true}}
                                    value={this.state.api_author}
                                    label='Автор (Фамилия И.О.)'
                                    name='api_author'
                                    autoComplete='api_author'
                                    onChange={ event => this.handleChange(event) }>
                                </TextField>

                                <Box fill='horizontal'>
                                    <Select options={genresArray2} value={this.state.genre} onChange={({ option }) => this.setValue(option)} />
                                </Box>
                                <Box
                                    as='footer'
                                    gap='small'
                                    direction='row'
                                    align='center'
                                    justify='end'
                                    pad={{ top: 'medium', bottom: 'none' }}
                                >
                                    <Link to='#'>
                                        <Button  primary label={
                                            <Text color='white'>
                                                <strong>Да</strong>
                                            </Text>
                                        } color='brand' onClick={event => this.handleSubmitISBN(event)}/>
                                    </Link>
                                    <Button
                                        label='Нет'
                                        onClick={this.props.onClose}
                                    />
                                </Box>
                            </Box>
                        </Tab>
                    </Tabs> */}
                </Box>
            </Box>
        );
    }
};

export default AddNewBook;