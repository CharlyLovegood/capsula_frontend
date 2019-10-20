import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Select } from 'grommet';
import TextField from '@material-ui/core/TextField';
import BookImage from './../ImageUpload/ImageUpload';

class PopUpButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: '', 
            author:'',
            genre: '',
            image: 'http://www.lm-magazine.com/wp-content/uploads/2017/05/080.jpg?w=326&h=436',
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
            "genre": 3,
            'image': this.state.image
        };
          
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': 'Token ' + localStorage.token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        };

        return fetch('/library/book_items/', requestOptions)
            .then(
                response => {
                    this.setState({action:{
                        type: 'AddBook',
                        isLoaded: true,
                        error: null
                    }})
                    this.props.onClose();
                    console.log(response);
                    return response;
                },
                error => {
                    this.setState({action:{
                        type: 'AddBook',
                        isLoaded: false,
                        error: error
                    }})
                });
        
    }

    setValue(genre) {
        this.setState({genre: genre});
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
                <Select options={['popScience', 'Detective', 'Poetry']} value={this.state.genre} onChange={({ option }) => this.setValue(option)}>

                </Select>
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

export default PopUpButton;