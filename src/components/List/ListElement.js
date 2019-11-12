import React from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

import { Box } from 'grommet';
import { Send } from 'grommet-icons';
import PopUpButton from '../Button/PopUpButton';
import SwapAgreement from '../Books/SwapAgreement';
import {bookStatuses} from './../../helpers/constants';
import { remote_url } from './../../helpers';

function ListElement(props) {
    const defaultAvatar = remote_url.images.user_default;

    const [avatar, setAvatar] = React.useState(props.owner.avatar ? props.owner.avatar : defaultAvatar);


    return (
        <Box direction='row' justify='between' align='center' fill pad='20px'>
            <Link to={`/user/${props.owner.id}`}>
                <img
                    alt='Remy Sharp'
                    src={avatar}
                    className={styles.avatar}
                    onError={() => {setAvatar(defaultAvatar)}}
                />
            </Link>
            <Box wrap direction='row' justify='between' align='center' fill>
                <Box pad='10px' direction='column'> 
                    <h3 className={styles.main_text}>{props.owner.django_user.username}</h3>
                    <p className={styles.text}>{!props.near ? 'В твоей общаге' : ''}</p>
                </Box>
                <Box width='180px'>
                    {props.status === bookStatuses.AVAILABLE ?
                        <PopUpButton fill='horizontal' innerObject={onclose => <SwapAgreement swapRequest={props.swapRequest} bookId={props.id} onClose={onclose}></SwapAgreement>} label='Попросить' icon={<Send></Send>}></PopUpButton>
                        :
                        <PopUpButton title='Книга занята' disabled fill='horizontal' innerObject={onclose => <SwapAgreement swapRequest={props.swapRequest} bookId={props.id} onClose={onclose}></SwapAgreement>} label='Попросить' icon={<Send></Send>}></PopUpButton>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ListElement;