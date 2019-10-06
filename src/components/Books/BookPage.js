import React, { Component } from 'react';
import styles from './Book.module.css';
import Book from '../Books/Book';
import List from '../List/List';
import { Box, Button } from 'grommet';

class BookPage extends Component {
    render() {
        return (
            <Box direction='column' align='center' fill>
                <Box background='brand' className={styles.background} align='center'>
                    <Book animation='slideUp' coverage='https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg'></Book>
                </Box>
                
                <Box direction='column' align='center' className={styles.container} width='auto'>
                    <h3 className={styles.header}>Book</h3>
                    <p className={styles.text}>Information about book</p>
                    <Box direction='row' justify='center'>
                        <Button margin='15px 5px' primary label='Add to wishlist'></Button>
                        <Button margin='15px 5px' label='Add to my booklist'></Button>
                    </Box>
                    <List></List>
                </Box>
            </Box>
        )
    }
}

export default BookPage;
