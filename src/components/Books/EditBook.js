import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Select } from 'grommet';
import TextField from '@material-ui/core/TextField';
import BookImage from './../ImageUpload/ImageUpload';
import {genresArray2, genres} from './../../helpers'
import styles from './Book.module.css';


class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: this.props.title, 
            author: this.props.author,
            genre: genresArray2[this.props.genre],
            genre_code: this.props.genre,
            image: this.props.coverage,
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit() {
        let book = {};
        if (this.state.bookName !== this.props.title) book['title'] = this.state.bookName;
        if (this.state.genre_code !== this.props.genre) book['genre'] = this.state.genre_code;
        if (this.state.image !== this.props.coverage) book['image'] = this.state.image;
        if (this.state.author !== this.props.author) book['authors'] = this.state.author;

        // const book = {
        //     'title': this.state.bookName,
        //     'genre': this.state.genre_code,
        //     'authors': this.state.author,
        //     'status': '',
        //     'isbn': '',
        //     'image': this.state.image
        // };
        
        console.log(book);
        this.props.editBook(book, this.props.id);
        this.props.onClose();
    }

    setValue(genre) {
        console.log(genre);
        console.log(genres[genre]);
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
                            Изменить
                        </Heading>
                        <BookImage shape='square' img={this.state.image} returnImage={(image) => this.handleImageChange(image)}></BookImage>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='bookName'
                            label='Название'
                            name='bookName'
                            autoComplete='bookName'
                            autoFocus
                            value={this.state.bookName}
                            onChange={ event => this.handleChange(event) }>
                        </TextField>                
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='author'
                            label='Автор'
                            name='author'
                            autoComplete='author'
                            value={this.state.author}
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
                            pad={{ top: 'medium', bottom: 'small' }}
                        >
                            <Link to='#'>
                                <Button label={
                                    <Text color='white'>
                                        <strong>Да</strong>
                                    </Text>
                                } primary onClick={event => this.handleSubmit(event)}/>
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

export default EditBook;