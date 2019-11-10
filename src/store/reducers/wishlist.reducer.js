import { wishlistConstants } from './../constants';

const initialState = {};

export function wishlist(state = initialState, action) {
    let wishlist = [];
    switch (action.type) {
        case wishlistConstants.GET_WISHLIST_REQUEST:
            return {
                requestingWishlist: true,
            }
        case wishlistConstants.GET_WISHLIST_SUCCESS:
            return {
                wishlistRecieved: true,
                wishlist: action.wishlist
            }
        case wishlistConstants.GET_WISHLIST_FAILURE:
            return {
                error: action.error
            }
        case wishlistConstants.DELETE_FROM_WISHLIST_SUCCESS:
            wishlist = state.wishlist || [];
            wishlist = wishlist.filter(function(item) {
                return item.id !== action.id
            })
            return {
                wishlistRecieved: true,
                wishlist: wishlist
            }
        case wishlistConstants.ADD_TO_WISHLIST_SUCCESS:
            wishlist = state.wishlist || [];
            const book = {
                'available': '',
                'book': {
                    "authors": action.book.authors,
                    "genre": action.book.genre,
                    'id': action.book.id,
                    "title": action.book.title,
                },
                'created_at': '',
                'image': action.book.image,
                'id': action.id,
            };
            wishlist.push(book);
            return {
                wishlistRecieved: true,
                wishlist: wishlist
            }
        default:
            return state;
    }
}