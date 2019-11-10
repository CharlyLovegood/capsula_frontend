import React, { Component } from 'react';
import styles from './BookPage.module.css';
import Book from '../../components/Books/Book';
import List from '../../components/List/List';
import { Box, Button } from 'grommet';

import { connect } from 'react-redux';
import { bookActions, swapActions, wishlistActions } from '../../store/actions'

import ErrorPage from './../../components/Error/ErrorPage';

class BookPage extends Component {
    state = { id: this.props.match.params.id, items: [], searched: false, addedToWishlist: undefined, changed: false }

    componentDidMount() {
        this.props.getBook(this.state.id);
    }

    componentWillUnmount() {
        this.setState({ addedToWishlist: undefined })
    }

    fetchData(title) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:` + encodeURIComponent(title))
        .then((response)=> response.json())
        .then((responseData)=> {
            this.setState({items: responseData})
        });
    
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.id) {
            this.setState({id: this.props.match.params.id});
            this.props.getBook(this.props.match.params.id);
            this.fetchData(this.props.book.book.data.title);
            
        }
        if (this.props.book.book && !this.state.searched) {
            this.fetchData(this.props.book.book.data.title);
            this.setState({searched: true});
        }
    }

    addToWishlist(book, id) {
        this.props.addToWishlist(book, id);
        this.setState({addedToWishlist: !this.state.addedToWishlist });
        this.setState({changed: true});
    }

    deleteFromWishlist(id) {
        this.props.deleteFromWishlist(id);
        this.setState({addedToWishlist: !this.state.addedToWishlist });
        this.setState({changed: true});
    }

    render() {
        let book = {};
        let {addedToWishlist} = this.state
        if (this.props.book.book) {
            book = this.props.book.book.data;
            if (addedToWishlist !== book.wishlist.added && !this.state.changed) {
                this.setState({ addedToWishlist: book.wishlist.added })
            }
        }
        return (
            <Box  direction='column' align='center' fill>
                {this.props.book.bookRecieved &&
                <Box direction='column' align='center' fill>
                    <Box background='brandGradient' className={styles.background} align='center'>
                        <Book title={book.authors} author={book.title} big='true' coverage={book.image}></Book>
                    </Box>
                    
                    <Box direction='column' align='center' margin={{vertical:'50px'}} width='large'>
                        <Box direction='row' justify='center'>
                            {addedToWishlist &&
                                <Button margin='15px 5px' primary label={<strong>Удалить из вишлиста</strong>} onClick={() => this.deleteFromWishlist(book.wishlist.id)}></Button>
                            }
                            {!addedToWishlist &&
                                <Button margin='15px 5px' primary label={<strong>Добавить в вишлист</strong>} onClick={() => this.addToWishlist(book, book.id)}></Button>
                            }
                        </Box>
                        <h3 className={styles.header}>{book.title}</h3>
                        <p className={styles.author}>{book.authors}</p>
                        {this.state.items.items &&
                            <p className={styles.text}>
                                {this.state.items.items[0].volumeInfo.description}
                            </p>
                        }
                        {book.book_items[0] &&
                            <List swapRequest={this.props.swapRequest} objectList={book.book_items} bookId={book.book_items[0].id}></List>
                        }
                    </Box>
                </Box>}

                {(this.props.alert.type === "alert-danger" && !this.props.book.bookRecieved) && <ErrorPage alert={this.props.alert.message}></ErrorPage>}
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
    deleteFromWishlist: wishlistActions.deleteFromWishlist,
    swapRequest: swapActions.swapRequest,
    addToWishlist: wishlistActions.addToWishlist
};

const connectedBookPage = connect(mapState, actionCreators)(BookPage);

export { connectedBookPage as BookPage };
