import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';

import { remote_url } from './../../helpers';


function Book(props) {
    const defaultCoverage = remote_url.images.default_book;
    const [bookCoverage, setBookCoverage] = React.useState(props.coverage ? props.coverage :  defaultCoverage);
    let link = '#'
    if (props.id > 0) {
        link = '/book/' + props.id;
    }

    return (
        <Box animation={props.animation} margin={props.margin} className={(props.size === 'small') ? styles.small_book : styles.book}>
            <Link to={link} className={(props.size === 'small') ? styles.small_book : styles.book}>
                <img 
                    alt='book coverage' 
                    src={bookCoverage} 
                    className={(props.size === 'small') ? styles.small_book_cover : styles.book_cover}
                    onError={()=>{setBookCoverage(defaultCoverage)}}>
                </img>
            </Link>
        </Box>
    )
}

export default Book;