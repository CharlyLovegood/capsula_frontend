import React from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

import { Box } from 'grommet';
import { Transaction } from 'grommet-icons';
import PopUpButton from '../Button/PopUpButton';
import SwapAgreement from '../Books/SwapAgreement';

function ListElement(props) {
    return (
        <Box direction='row' justify='between' align='center' fill pad='20px'>
            <Link to={`/user/${props.owner.id}`}>
                <img
                    alt='Remy Sharp'
                    src={props.owner.avatar}
                    className={styles.avatar}
                />
            </Link>
            <Box direction='column' width='100%'> 
                <h3 className={styles.main_text}>{props.owner.django_user.username}</h3>
                <p className={styles.text}></p>
            </Box>
            <Box width='260px'>
                <PopUpButton  fill='horizontal' innerObject={onclose => <SwapAgreement bookId={props.id} onClose={onclose}></SwapAgreement>} label='Попросить' icon={<Transaction></Transaction>}></PopUpButton>
            </Box>
        </Box>
    )
}

export default ListElement;