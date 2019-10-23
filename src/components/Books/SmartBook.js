import React from 'react';
import styles from './Book.module.css';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';
import { Close, More, Edit } from 'grommet-icons';
import { Button } from 'grommet';

import { remote_url } from './../../helpers';
import PopUpButton from './../Button/PopUpButton';
import ConfirmDeleteBook from './ConfirmBookDelete';
import EditBook from './EditBook';

const SmartBook = (props) => {
    const defaultCoverage = remote_url.images.default_book;
    const [bookCoverage, setBookCoverage] = React.useState(props.coverage ? props.coverage : defaultCoverage);

    return (
        <Box className={styles.book_card}>
            <Box className={styles.book_card_inner}>
                <Box className={styles.book_card_front}>
                    <img 
                        alt='book coverage' 
                        src={bookCoverage} 
                        className={(props.size === 'small') ? styles.small_book_cover : styles.book_cover}
                        onError={() => {setBookCoverage(defaultCoverage)}}>
                    </img>
                </Box>
                <Box background='brand' pad='10px' align='center' justify='around' className={styles.book_card_back}>
                    <img 
                        alt='book coverage' 
                        src={bookCoverage} 
                        className={styles.book_cover_back}
                        onError={() => {setBookCoverage(defaultCoverage)}}>
                    </img>
                    <h4 className={styles.book_title}>
                        {props.title}
                    </h4>
                    <Box gap='15px'>
                        <PopUpButton fill='horizontal' forceUpdate={null}
                            innerObject={(onclose, forceUpdate) => <EditBook genre={props.genre} author={props.author} title={props.title} coverage={bookCoverage} id={props.id} editBook={(book) => props.handleEditBook(book)} onClose={onclose} forceUpdate={forceUpdate} />} 
                            label='Edit' 
                            icon={<Edit color='accent-1'></Edit>}>
                        </PopUpButton>
                        <Link to={'/book/' + props.idAbstract} >
                            <Button fill='horizontal' icon={<More color='accent-1'></More>} label='Info'/>
                        </Link>
                        <PopUpButton forceUpdate={null}
                            innerObject={(onclose, forceUpdate) => <ConfirmDeleteBook id={props.id} deleteBook={(book) => props.handleDeleteBook(book)} onClose={onclose} forceUpdate={forceUpdate}></ConfirmDeleteBook>} 
                            label='Delete' 
                            icon={<Close color='accent-1'></Close>}>
                        </PopUpButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SmartBook;