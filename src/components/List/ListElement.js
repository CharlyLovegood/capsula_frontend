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
                    src={props.image}
                    className={styles.avatar}
                />
            </Link>
            <Box direction='column' width='100%'> 
                <h3 className={styles.main_text}>{props.owner.django_user.username}</h3>
                <p className={styles.text}>0,3 km from you</p>
            </Box>
            <PopUpButton innerObject={onclose => <SwapAgreement bookId={props.id} onClose={onclose}></SwapAgreement>} label='Swap' icon={<Transaction></Transaction>}></PopUpButton>
        </Box>
    )
}

export default ListElement;