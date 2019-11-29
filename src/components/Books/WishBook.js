import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';
import { Close, More } from 'grommet-icons';
import { Button, Text } from 'grommet';

import { remote_url } from './../../helpers';


const WishBook = (props) => {
    const defaultCoverage = remote_url.images.default_book;
    const [bookCoverage, setBookCoverage] = React.useState(props.coverage ? props.coverage : defaultCoverage);

    return (
        <Box margin='10px' width='book-width' height='book-height' className={styles.book_card}>
            <Box className={styles.book_card_inner}>
                <Box background={`url(${bookCoverage})`} className={styles.book_card_front}>
                    { bookCoverage === defaultCoverage &&
                        <Box>
                            <Text textAlign='center' color='white'><strong>{props.title}</strong></Text>
                            <Text textAlign='center' color='white'>{props.author}</Text>
                        </Box>
                    }
                </Box>
                <Box background='brand' pad={{horizontal: '5px', vertical: '40px'}} align='center' justify='end' className={styles.book_card_back}>
                    <img 
                        alt='book coverage' 
                        src={bookCoverage} 
                        className={styles.book_cover_back}
                        onError={() => {setBookCoverage(defaultCoverage)}}>
                    </img>
                    <h4 className={styles.book_title}>
                        {props.title}
                    </h4>
                    <Box fill='horizontal' gap='15px' justify='center'>
                        <Link to={'/book/' + props.idAbstract} >
                            <Box fill='horizontal' align='center' justify='center'>
                                <Button fill='horizontal' icon={<More color='accent-1'></More>} label={
                                    <Text>
                                        <strong>Подробнее</strong>
                                    </Text>
                                }/>
                            </Box>
                        </Link>
                        <Box fill='horizontal' align='center' justify='center'>
                            <Button icon={<Close color='accent-1'></Close>} fill='horizontal' label={<strong>Удалить</strong>} onClick={() => props.handleDeleteFromWishlist(props.id)}></Button>
                        </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
    )
}

export default WishBook;