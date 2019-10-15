import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Box, Button, Heading, Text } from 'grommet';
import TextField from '@material-ui/core/TextField';


class PopUpButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookName: '', 
            author:'',
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
            "genre": 3
        };
          
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': 'Token ' + localStorage.token},
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

    render(props) {
        return (
            <Box pad='medium' gap='small' width='medium'>
                <Heading level={3} margin='none'>
                    Confirm
                </Heading>
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
                <Box
                    as='footer'
                    gap='small'
                    direction='row'
                    align='center'
                    justify='end'
                    pad={{ top: 'medium', bottom: 'small' }}
                >
                    <Link to='/books'>
                        <Button label='Yes' color='dark-3' onClick={event =>this.handleSubmit(event)}/>
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