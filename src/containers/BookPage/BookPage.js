import React, { Component } from 'react';
import styles from './BookPage.module.css';
import Book from '../../components/Books/Book';
import List from '../../components/List/List';
import { Box, Button } from 'grommet';

import { connect } from 'react-redux';
import {bookActions} from '../../store/actions'

import ErrorPage from './../../components/Error/ErrorPage';

class BookPage extends Component {
    state = { id: this.props.match.params.id }

    componentDidMount() {
        this.props.getBook(this.state.id);
    }

    render() {
        let book = {};
        if (this.props.book.book) {
            book = this.props.book.book.data
        }
        return (
            this.props.book.bookRecieved ? (
            <Box direction='column' align='center' fill>
                <Box background='brandGradient' className={styles.background} align='center'>
                    <Book animation='slideUp' coverage='https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg'></Book>
                </Box>
                
                <Box direction='column' align='center' className={styles.container} width='auto'>
                    <h3 className={styles.header}>{book.title}</h3>
                    <p className={styles.text}>{book.authors}</p>
                    <p className={styles.text}>{book.description}</p>
                    <Box direction='row' justify='center'>
                        <Button margin='15px 5px' primary label='Add to wishlist'></Button>
                        <Button margin='15px 5px' label='Add to my booklist'></Button>
                    </Box>
                    <List></List>
                </Box>
            </Box>
            ) : <ErrorPage alert={this.props.alert}></ErrorPage>
        )
    }
}


const mapState = state => ({
    book: state.book,
    alert: state.alert
})

const actionCreators = {
    getBook: bookActions.getBook,
    deleteBook: bookActions.deleteBook,
    addBook: bookActions.addBook
};

export default connect(mapState, actionCreators)(BookPage);