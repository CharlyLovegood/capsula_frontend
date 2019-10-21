import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Select } from 'grommet';
import TextField from '@material-ui/core/TextField';
import BookImage from './../ImageUpload/ImageUpload';
import {genresArray, genres} from './../../helpers'

import { remote_url } from './../../helpers';

class AddNewBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: '', 
            author:'',
            genre: '',
            image: remote_url.images.add_new_book_default,
            action: {
                type: '',
                isLoaded: false,
                error: null
            }
        };
    }

    handleAuthorChange(event) {
        this.setState({author: event.target.value});
    }

    handleBookNameChange(event) {
        this.setState({bookName: event.target.value});
    }

    handleSubmit(event) {
        const book = {
            "title": this.state.bookName,
            "authors": this.state.author,
            "genre": this.state.genre,
            'image': this.state.image
        };
          
        this.props.handleAddNewBook(book);
        this.props.onClose();
    }

    setValue(genre) {
        this.setState({genre: genres[genre]});
    }

    handleImageChange(image) {
        this.setState({image: image});
    }

    render(props) {
        return (
            <Box pad='medium' gap='small' width='medium' align='center'>
                <Heading level={3} margin='none'>
                    Confirm
                </Heading>
                <BookImage shape='square' img={this.state.image} returnImage={(image) => this.handleImageChange(image)}></BookImage>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='bookname'
                    label='Book Name'
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
                    label='Author'
                    name='author'
                    autoComplete='author'
                    onChange={ event => this.handleAuthorChange(event) }>
                </TextField>
                <Box fill>
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
                    <Link to='/library'>
                        <Button label='Yes' color='dark-3' onClick={event => this.handleSubmit(event)}/>
                    </Link>
                    <Button
                        label={
                            <Text color='white'>
                                <strong>No</strong>
                            </Text>
                        }
                        onClick={this.props.onClose}
                        primary
                        color='status-critical'
                    />
                </Box>
            </Box>
        );
    }
};

export default AddNewBook;