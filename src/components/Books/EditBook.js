import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Select } from 'grommet';
import TextField from '@material-ui/core/TextField';
import BookImage from './../ImageUpload/ImageUpload';
import {genresArray, genres} from './../../helpers'

class AddNewBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: this.props.title, 
            author: this.props.author,
            genre: genresArray[this.props.genre],
            genre_code: this.props.genre,
            image: this.props.coverage,
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit() {
        const book = {
            "title": this.state.bookName,
            "genre": this.state.genre_code,
            "authors": this.state.author,
            "status": "",
            "isbn": "",
            'image': this.state.image
        };
          
        this.props.editBook(book, this.props.id);
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
                <Heading level={3} margin='none'>
                    Edit book
                </Heading>
                <BookImage shape='square' img={this.state.image} returnImage={(image) => this.handleImageChange(image)}></BookImage>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='bookName'
                    label='Book Name'
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
                    label='Author'
                    name='author'
                    autoComplete='author'
                    value={this.state.author}
                    onChange={ event => this.handleChange(event) }>
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