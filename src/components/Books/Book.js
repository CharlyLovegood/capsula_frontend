import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';


function Book(props) {
    return (
        <Box animation={props.animation} margin={props.margin} className={(props.size === 'small') ? styles.small_book : styles.book}>
            <Link to={'/book/' + props.id} className={(props.size === 'small') ? styles.small_book : styles.book}>
                <img 
                    alt='book coverage' 
                    src={props.coverage ? props.coverage : 'https://i.pinimg.com/564x/31/4a/28/314a2856c47596b485162f23aa3b297a.jpg' } 
                    className={(props.size === 'small') ? styles.small_book_cover : styles.book_cover}>
                </img>
            </Link>
        </Box>
    )
}

export default Book;