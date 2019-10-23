export const remote_url = {
    images: {
        user_default: 'https://i.pinimg.com/564x/08/1f/b1/081fb1c4f463c09c0191d27ebdeb3c2e.jpg',
        scroll_additional_book: 'https://i.pinimg.com/564x/26/c0/c9/26c0c9f3b8a69b66a1ae8fb5904925f8.jpg',
        error: 'https://cdn.dribbble.com/users/1322726/screenshots/5695684/dribbble-3.gif',
        add_new_book_default: 'http://www.lm-magazine.com/wp-content/uploads/2017/05/080.jpg?w=326&h=436',
        default_book: 'https://i.pinimg.com/564x/31/4a/28/314a2856c47596b485162f23aa3b297a.jpg',
        banner: 'https://cdn.dribbble.com/users/2100947/screenshots/4342118/attachments/988968/readbook_website.png'
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