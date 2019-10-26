import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text } from 'grommet';


class ConfirmDeleteBook extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit() {
        console.log(this.props)
        this.props.deleteBook(this.props.id);
        this.props.onClose();
    }

    render() {
        return (
            <Box pad='medium' gap='small' width='medium' align='center'>
                <Heading level={3} margin='none'>
                    Confirm Book Delete
                </Heading>
                <Box
                    as='footer'
                    gap='small'
                    direction='row'
                    align='center'
                    justify='end'
                    pad={{ top: 'medium', bottom: 'small' }}
                >
                    <Link to='#'>
                        <Button label='Yes' color='dark-3' onClick={() => this.handleSubmit()}/>
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

export default ConfirmDeleteBook;