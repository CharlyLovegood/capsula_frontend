import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';
import { Close, More } from 'grommet-icons';
import { Button } from 'grommet';

import { remote_url } from './../../helpers';

const SmartBook = (props) => {
    return (
        <Box className={styles.book_card}>
            <Box className={styles.book_card_inner}>
                <Box className={styles.book_card_front}>
                    <img 
                        alt='book coverage' 
                        src={props.coverage ? props.coverage : remote_url.images.default_book } 
                        className={(props.size === 'small') ? styles.small_book_cover : styles.book_cover}>
                    </img>
                </Box>
                <Box background='brand' pad='10px' align='center' justify='around' className={styles.book_card_back}>
                    <img 
                        alt='book coverage' 
                        src={props.coverage ? props.coverage : remote_url.images.default_book } 
                        className={styles.book_cover_back}>
                    </img>
                    <h4 className={styles.book_title}>
                        {props.title}
                    </h4>
                    <Box gap='15px'>
                        <Button onClick={() => props.handleDeleteBook(props.id)} fill='horizontal' width='100px' label='Delete' icon={<Close color='accent-1'></Close>}/>
                        <Link to={'/book/' + props.idAbstract} >
                            <Button fill='horizontal' icon={<More color='accent-1'></More>} label='Info'/>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SmartBook;