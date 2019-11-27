import React, { Component } from 'react';
import styles from './BookPage.module.css';
import Book from '../../components/Books/Book';
import List from '../../components/List/List';
import { Box, Button, Text } from 'grommet';

import { connect } from 'react-redux';
import { bookActions, swapActions, wishlistActions } from '../../store/actions'

import ErrorPage from './../../components/Error/ErrorPage';
import Map from '../../components/Map/Map';
import SizeComponent from '../../components/SizeComponent/SizeComponent';

class BookPage extends Component {
    state = { id: this.props.match.params.id, 
        items: [], 
        description: '',
        addedToWishlist: undefined, 
        changed: false,
        book: undefined, 
        currentPosition: {}
    }

    componentDidMount() {
        
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        
        const success = (pos) => {
            var crd = pos.coords;
            this.setState({currentPosition: { latitude: crd.latitude, longitude: crd.longitude }});
            this.props.getBook(this.state.id, crd);
        };
          
        const error = (err) => {
            this.setState({permissionGiven: false});
            this.props.getBook(this.state.id);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    componentWillUnmount() {
        this.setState({ addedToWishlist: undefined })
    }

    fetchData(title) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:` + encodeURIComponent(title))
        .then((response)=> response.json())
        .then((responseData)=> {
            this.setState({items: responseData});
            if (responseData.totalItems !== 0) {
                this.setState({description: responseData.items[0].volumeInfo.description});
            } else {
                this.setState({description: ''});
            }
        });
    }

    componentDidUpdate() {
        if (this.props.book.bookRecieved && this.state.book !== this.props.book.book.data) {
            this.setState({book: this.props.book.book.data});
            this.fetchData(this.props.book.book.data.title);
        }
        if (this.state.id !== this.props.match.params.id) {
            this.setState({id: this.props.match.params.id});
            this.props.getBook(this.props.match.params.id);
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
        let {book} = this.state;
        let {addedToWishlist} = this.state
 
        return (
            <Box  direction='column' align='center' fill>
                {this.state.book &&
                <Box direction='column' align='center' fill>
                    <Box  background='brandGradient' className={styles.background} align='center'>
                        <Box margin={{vertical:'130px'}}>
                            <Book animation='slideUp' author={book.authors} title={book.title} big='true' coverage={book.image}></Book>
                        </Box>
                    </Box>
                    
                    <Box pad='10px' direction='column' align='center' margin={{vertical:'50px'}} width='large'>
                        <Box direction='row' justify='center'>
                            {addedToWishlist && book.book_items.length !== 0 &&
                                <Button margin='15px 5px' primary label={<strong>Удалить из вишлиста</strong>} onClick={() => this.deleteFromWishlist(book.wishlist.id)}></Button>
                            }
                            {!addedToWishlist && book.book_items.length !== 0 &&
                                <Button margin='15px 5px' primary label={<strong>Добавить в вишлист</strong>} onClick={() => this.addToWishlist(book, book.id)}></Button>
                            }
                            {/* {book.book_items.length === 0 &&
                                <Button disabled title='У вас есть эта книга' margin='15px 5px' primary label={<strong>Добавить в вишлист</strong>}></Button>
                            } */}
                        </Box>
                        <h3 className={styles.header}>{book.title}</h3>
                        <p className={styles.author}>{book.authors}</p>
                        <p className={styles.text}>
                            {this.state.description}
                        </p>
                        {book.book_items[0] &&
                        <SizeComponent>
                            {size =>
                            <Box direction='column' align='center' fill='horizontal'>
                                <Text color='black' size='22px'><strong>Доступные книги</strong></Text>
                                <Map markers={book.book_items} 
                                    key='bookpagemap' 
                                    width={size > 600 ? '600' : size-20}  
                                    interactive={false} 
                                    list={<List swapRequest={this.props.swapRequest} objectList={book.book_items} bookId={book.book_items[0].id} />} 
                                    swapRequest={this.props.swapRequest} 
                                    bookId={book.book_items[0].id}></Map>
                            </Box>
                            }
                        </SizeComponent>
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
