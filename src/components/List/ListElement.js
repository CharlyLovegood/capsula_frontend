import React from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

import { Box } from 'grommet';
import { Transaction } from 'grommet-icons';
import PopUpButton from '../Button/PopUpButton';
import SwapAgreement from '../Books/SwapAgreement';

function ListElement(props) {
    return (
        <Box direction='row' justify='between' align='center' width='500px'>
            <Link to='/profile_id=1'>
                <img
                    alt='Remy Sharp'
                    src='https://cdn.dribbble.com/users/1253590/screenshots/7221280/media/03e0c431c9196bdb0d32bbe5b030918c.png'
                    className={styles.avatar}
                />
            </Link>
            <Box direction='column' width='100%'> 
                <h3 className={styles.main_text}>Natalia</h3>
                <p className={styles.text}>0,3 km from you</p>
            </Box>
            <PopUpButton innerObject={onclose => <SwapAgreement bookId={props.bookId} onClose={onclose}></SwapAgreement>} label='Swap' icon={<Transaction></Transaction>}></PopUpButton>
        </Box>
    )
}

export default ListElement;