import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';

import { remote_url } from './../../helpers';


function Book(props) {
    return (
        <Box animation={props.animation} margin={props.margin} className={(props.size === 'small') ? styles.small_book : styles.book}>
            <Link to={'/book/' + props.id} className={(props.size === 'small') ? styles.small_book : styles.book}>
                <img 
                    alt='book coverage' 
                    src={props.coverage ? props.coverage :  remote_url.images.default_book} 
                    className={(props.size === 'small') ? styles.small_book_cover : styles.book_cover}>
                </img>
            </Link>
        </Box>
    )
}

export default Book;