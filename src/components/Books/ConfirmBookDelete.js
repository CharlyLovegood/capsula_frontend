import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text } from 'grommet';


class ConfirmDeleteBook extends Component {
    handleSubmit() {
        this.props.deleteBook(this.props.id);
        this.props.onClose();
    }

    render() {
        return (
            <Box pad='medium' gap='small' width='medium' align='center'>
                <Heading level={3} margin='none'>
                    Подтвердите удаление книги
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
                        <Button label='Да' color='dark-3' onClick={() => this.handleSubmit()}/>
                    </Link>
                    <Button
                        label={
                            <Text color='white'>
                                <strong>Нет</strong>
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