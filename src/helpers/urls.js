export const remote_url = {
    images: {
        user_default: `https://i.pinimg.com/564x/10/c0/ec/10c0ec7c0fbd08020a41162d9d28e9d7.jpg`,
        scroll_additional_book: `htps://thelogocompany.net/wp-content/uploads/2016/05/gradient.jpg`,
        error: `https://i.pinimg.com/originals/b0/2d/6b/b02d6b7c02aab3197f171a7e1d815aef.gif`,
        add_new_book_default: `https://i.pinimg.com/564x/10/c0/ec/10c0ec7c0fbd08020a41162d9d28e9d7.jpg`,
        default_book: `https://i.pinimg.com/564x/c6/81/79/c6817902246bd9723c2520a86c6105b9.jpg`,
    }
}

const proxy = "http://127.0.0.1:5000";

export const back_url = {
    books: {
        add_book: `${proxy}/library/book_items/`,
        delete_book: (id) => `${proxy}/library/book_items/${id}/`,
        get_book: (id) => `${proxy}/library/books/${id}/`,
        edit_book: (id) => `${proxy}/library/book_items/${id}/`,
    },
    library: {
        get_library: `${proxy}/library/book_items/`,
        get_library_by_id: (id) => `${proxy}/library/${id}/book_items/`,
        get_all_books: `${proxy}/library/books/`,
        get_all_books_page: (page) => `${proxy}/library/books/?pages=${page}`
    },
    search: {
        search: (query, page, genre) => `${proxy}/library/books/?q=${query}&page=${page}&genre=${genre}`
    },
    swap: {
        get_swap_list: `${proxy}/library/swaps/`,
        change_status: (id) => `${proxy}/library/swaps/${id}/`
    },
    user: {
        change_user_data: `${proxy}/user/me/`,
        get_user_by_id: (id) => `${proxy}/user/${id}/`
    },
    management: {
        user_complain: `${proxy}/management/complaint_user/`,
        book_complain: `${proxy}/management/complaint_book/`,
    },
    map: {
        get_list: `${proxy}/map/`,
        add_marker: `${proxy}/map/`,
        delete_marker: (id) => `${proxy}/map/${id}/`
    },
    authentication: {
        login: `${proxy}/auth/login/`,
        logout: `${proxy}/auth/logout/`,
        registration: `${proxy}/auth/registration/`
    },
    wishlist: {
        delete_from_wishlist: (id) => `${proxy}/library/wishlist/${id}/`,
        add_to_wishlist: `${proxy}/library/wishlist/`,
        get_wishlist: `${proxy}/library/wishlist/`
    }
}