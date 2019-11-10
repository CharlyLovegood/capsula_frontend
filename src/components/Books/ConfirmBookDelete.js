import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text } from 'grommet';
import styles from './Book.module.css';


class ConfirmDeleteBook extends Component {
    handleSubmit() {
        this.props.deleteBook(this.props.id);
        this.props.onClose();
    }

    render() {
        return (
            <Box pad='medium' gap='small' width='medium' align='center' justify='center' fill>
                <Box className={styles.scroll_container}>
                    <Box className={styles.scroll_page}>
                        <Heading level={3} margin='none'>
                            Подтвердите удаление книги
                        </Heading>
                        <Box
                            as='footer'
                            gap='small'
                            direction='row'
                            align='center'
                            pad={{ top: 'medium', bottom: 'small' }}
                        >
                            <Link to='#'>
                                <Button label={
                                    <Text color='white'>
                                        <strong>Да</strong>
                                    </Text>
                                } primary onClick={() => this.handleSubmit()}/>
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

export default ConfirmDeleteBook;