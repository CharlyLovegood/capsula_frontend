import React, { Component } from 'react';
import styles from './BookPage.module.css';
import Book from '../../components/Books/Book';
import List from '../../components/List/List';
import { Box } from 'grommet';

import { connect } from 'react-redux';
import { bookActions, swapActions } from '../../store/actions'

import ErrorPage from './../../components/Error/ErrorPage';

class BookPage extends Component {
    state = { id: this.props.match.params.id, items: [], searched: false }

    componentDidMount() {
        this.props.getBook(this.state.id);
    }

    fetchData(title) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:` + encodeURIComponent(title))
        .then((response)=> response.json())
        .then((responseData)=> {
            // console.log(responseData)
            this.setState({items: responseData})
        });
    
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.id) {
            this.setState({id: this.props.match.params.id});
            this.props.getBook(this.props.match.params.id);
            this.fetchData(this.props.book.book.data.title);
            // console.log(this.state);
        }
        if (this.props.book.book && !this.state.searched) {
            this.fetchData(this.props.book.book.data.title);
            this.setState({searched: true});
            // console.log(this.state);
        }
    }

    render() {
        let book = {};
        if (this.props.book.book) {
            book = this.props.book.book.data
        }
        return (
            <Box  direction='column' align='center' fill>
                {this.props.book.bookRecieved &&
                <Box direction='column' align='center' fill>
                    <Box background='brandGradient' className={styles.background} align='center'>
                        <Book big='true' coverage={book.image}></Book>
                    </Box>
                    
                    <Box direction='column' align='center' margin={{vertical:'100px'}} width='large'>
                        <h3 className={styles.header}>{book.title}</h3>
                        <p className={styles.author}>{book.authors}</p>
                        {this.state.items.items &&
                            <p className={styles.text}>
                                {this.state.items.items[0].volumeInfo.description}
                            </p>
                        }
                        {/* <Box direction='row' justify='center'>
                            <Button margin='15px 5px' primary label='Add to wishlist'></Button>
                            <Button margin='15px 5px' label='Add to my booklist'></Button>
                        </Box> */}
                        {book.book_items[0] &&
                            <List swapRequest={this.props.swapRequest} objectList={book.book_items} bookId={book.book_items[0].id}></List>
                        }
                    </Box>
                </Box>}

                {(this.props.alert.type === "alert-danger") && <ErrorPage alert={this.props.alert}></ErrorPage>}
            </Box>
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
    addBook: bookActions.addBook,
    swapRequest: swapActions.swapRequest
};

export default connect(mapState, actionCreators)(BookPage);