import React, { Component } from 'react';
import { Box, Text, Button } from 'grommet';
import SmartBook from '../../components/Books/WishBook';
import Gallery from '../../components/Gallery/Gallery';
import { wishlistActions } from '../../store/actions';
import { connect } from 'react-redux';
import Book from '../../components/Books/Book';
import { StatusGood, StatusCritical, Search } from 'grommet-icons';
import {Link} from 'react-router-dom';


class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: Number(this.props.user.id) === Number(this.props.match.params.id)
        }
    }

    componentDidMount() {
        this.getWishlist();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({owner: Number(this.props.user.id) === Number(this.props.match.params.id)});
            this.getWishlist();
        }
    }

    getWishlist() {
        this.props.getWishlist(this.props.match.params.id);
    }

    render() {
        const { wishlist } = this.props;

        return (
            <Box direction='column' align='center' width='xxlarge'>

                {(this.props.alert.type === 'alert-success') &&
                    <Box margin='10px' round='10px' direction='row' gap='10px' pad='10px' border={{ color: 'status-ok', size: 'xsmall' }}>
                        <StatusGood color='status-ok'></StatusGood>
                        {this.props.alert.message}
                    </Box>
                }


                {(this.props.alert.type === 'alert-danger') &&
                    <Box margin='10px' round='10px' direction='row' pad='10px' gap='10px' border={{ color: 'status-critical', size: 'xsmall' }}>
                        <StatusCritical color='status-critical'></StatusCritical>
                        {this.props.alert.message}
                    </Box>
                }

                {wishlist.wishlistRecieved && this.state.owner &&
                    <Box direction='column' align='center' width='xxlarge'>
                        <Gallery 
                            object={(title, coverage, genre, author, id, idAbstract) => <SmartBook handleDeleteFromWishlist={this.props.deleteFromWishlist} margin='10px' author={author} genre={genre} title={title} coverage={coverage} key={id} id={id} idAbstract={idAbstract}></SmartBook>} 
                            objectList={wishlist.wishlist}
                            //  header='Мои книги'
                            contentType='smart-books'
                            key="galleryWishListOwner"
                            message='Сюда можно складывать все то, что вам понравилось'
                        ></Gallery>
                        
                        <Box margin='20px'>
                            <Link to='/search/1'>
                                <Button  
                                    label={<Text><strong>Найти книгу</strong></Text>} 
                                    primary
                                    icon={<Search />}
                                    key='WishlistButton'>
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                }
                {wishlist.wishlistRecieved && !this.state.owner &&
                    <Box align='center' width='xxlarge'>
                        <Gallery 
                            object={(title, coverage, genre, author, id, idAbstract) => <Book margin='10px' author={author} genre={genre} title={title} coverage={coverage} key={id} id={idAbstract}></Book>} 
                            objectList={wishlist.wishlist}
                            // header='Книги'
                            contentType='books'
                            key="galleryWishListNotOwner"
                            message="Пользователь еще не добавил книг в вишлист"
                        ></Gallery>
                    </Box>
                }
            </Box>
        )
    }
}

const mapState = state => ({
    user: state.authentication.user,
    alert: state.alert,
    wishlist: state.wishlist
})

const actionCreators = {
    getWishlist: wishlistActions.getWishlist,
    deleteFromWishlist: wishlistActions.deleteFromWishlist,
}


const connectedWishlist = connect(mapState, actionCreators)(WishList);

export { connectedWishlist as WishList };