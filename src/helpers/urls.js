export const remote_url = {
    images: {
        user_default: 'https://i.pinimg.com/564x/10/c0/ec/10c0ec7c0fbd08020a41162d9d28e9d7.jpg',
        scroll_additional_book: 'htps://thelogocompany.net/wp-content/uploads/2016/05/gradient.jpg',
        error: 'https://i.pinimg.com/originals/b0/2d/6b/b02d6b7c02aab3197f171a7e1d815aef.gif',
        add_new_book_default: 'htts://image.flaticon.com/icons/svg/182/182321.svg',
        default_book: 'https://i.pinimg.com/564x/91/44/88/914488383fa8028585ee69f2fd975e77.jpg',
    }
}

export const back_url = {
    books: {
        add_book: '/library/book_items/',
        delete_book: (id) => `/library/book_items/${id}/`,
        get_book: (id) => `/library/books/${id}/`,
        edit_book: (id) => `/library/book_items/${id}/`,
    },
    library: {
        get_library: '/library/book_items/',
        get_library_by_id: (id) => `/library/${id}/book_items/`,
        get_all_books: '/library/books/'
    },
    swap: {
        get_swap_list: '/library/swaps/',
        change_status: (id) => `/library/swaps/${id}/`
    },
    user: {
        change_user_data: '/user/me/',
        get_user_by_id: (id) => `/user/${id}/`
    },
    authentication: {
        login: '/auth/login/',
        logout: '/auth/logout/',
        registration: '/auth/registration/'
    },
    wishlist: {
        delete_from_wishlist: (id) => `/library/wishlist/${id}/`,
        add_to_wishlist: '/library/wishlist/',
        get_wishlist: '/library/wishlist/'
    }
}