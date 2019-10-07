import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';


function Book(props) {
    return (
        <Box animation={props.animation} margin={props.margin} >
            <Link to='/book_id=1'>
                <img 
                    alt='book coverage' 
                    src={props.coverage} 
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