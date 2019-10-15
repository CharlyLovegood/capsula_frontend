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
                    src={props.coverage ? props.coverage : 'https://i.pinimg.com/564x/b3/2a/95/b32a956e0c1f658a2b0b88c04b9b1fbd.jpg' } 
                    className={(props.size === 'small') ? styles.small_book_cover : styles.book_cover}>
                </img>
            </Link>
            <h4 className={styles.book_title}>
                {props.title}
            </h4>
        </Box>
    )
}

export default Book;