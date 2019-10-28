export const remote_url = {
    images: {
        user_default: 'https://i.pinimg.com/564x/10/c0/ec/10c0ec7c0fbd08020a41162d9d28e9d7.jpg',
        scroll_additional_book: 'https://i.pinimg.com/564x/26/c0/c9/26c0c9f3b8a69b66a1ae8fb5904925f8.jpg',
        error: 'https://cdn.dribbble.com/users/1322726/screenshots/5695684/dribbble-3.gif',
        add_new_book_default: 'https://i.pinimg.com/564x/91/44/88/914488383fa8028585ee69f2fd975e77.jpg',
        default_book: 'https://i.pinimg.com/564x/91/44/88/914488383fa8028585ee69f2fd975e77.jpg',
    }
}

export const back_url = {
    books: {
        add_book: '/library/book_items/',
        delete_book: (id) => `/library/book_items/${id}/`,
        get_book: (id) => `/library/books/${id}/`,
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
    }
}