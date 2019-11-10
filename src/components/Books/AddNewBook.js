import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Select } from 'grommet';
import TextField from '@material-ui/core/TextField';
import BookImage from './../ImageUpload/ImageUpload';
import {genresArray, genres} from './../../helpers'

import { remote_url } from './../../helpers';
import styles from './Book.module.css';

class AddNewBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: '', 
            author:'',
            genre: 'Жанр',
            genre_code: 0,
            image: remote_url.images.add_new_book_default,
        };
    }

    handleAuthorChange(event) {
        this.setState({author: event.target.value});
    }

    handleBookNameChange(event) {
        this.setState({bookName: event.target.value});
    }

    handleSubmit() {
        let book;
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
    }

    setValue(genre) {
        this.setState({genre_code: genres[genre]});
        this.setState({genre: genre});
    }

    handleImageChange(image) {
        this.setState({image: image});
    }

    render() {
        return (
            <Box pad='medium' gap='small' width='medium' align='center' fill>
                <Box className={styles.scroll_container}>
                    <Box className={styles.scroll_page}>
                        <Heading level={3} margin='none'>
                            Добавить книгу
                        </Heading>
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
                            autoComplete='author'
                            onChange={ event => this.handleAuthorChange(event) }>
                        </TextField>
                        <Box fill='horizontal'>
                            <Select options={genresArray} value={this.state.genre} onChange={({ option }) => this.setValue(option)} />
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
                </Box>
            </Box>
        );
    }
};

export default AddNewBook;