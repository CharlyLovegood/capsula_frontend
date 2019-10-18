import React from 'react';
import { Box, Button } from 'grommet';
import Book from './Book';
import { Link } from '@material-ui/core';
import styles from './Book.module.css';


function BookCard(props) {
    let ButtonBlock = (<Button></Button>);
    switch (props.type) {
        case 'proposal':
            ButtonBlock = (<Box width='130px' direction='column' gap='5px'>
                                <Button margin='5px' color='brand' fill='vertical' label='Accept' onClick={props.handleAcceptProposal}></Button>
                                <Button margin='5px' color='dark-3' fill='vertical' label='Reject' onClick={props.handleRejectProposal}></Button>
                            </Box>);
            break;
        case 'request':
            ButtonBlock = (<Button margin='5px' fill='vertical' label='Cancel' onClick={props.handleCancelRequest}></Button>);
            break;
        case 'inProcess':
            ButtonBlock = (<Button margin='5px' fill='vertical' label='Delivered' onClick={props.handleBookDelivered}></Button>);
            break;
        case 'onHands':
            ButtonBlock = (<Button margin='5px' fill='vertical' label='Finish' onClick={props.handleFinishSwap}></Button>); 
            break;
        default:
            ButtonBlock = (<Button></Button>);
            break;
    }

    return (
        <Box fill 
            direction='row' 
            align='center' 
            justify='between' 
            background='light_contrast' 
            margin={{'vertical': '10px', 'horizontal':'0px'}}
        >
            <Book size='small' title={props.title} coverage={props.coverage} key={props.id}></Book>
            <Box flex='grow' direction='column' pad='0px'>
                <h3 className={styles.text_header}>{props.title}ff</h3>
                <p className={styles.text}>Reqiested by: <Link to=''>ss{props.user}</Link></p>
                <p className={styles.text}>Request was sent: {props.date}</p>
            </Box>
            <Box width='130px'>
                {ButtonBlock}
            </Box>
        </Box>
    )
}

export default BookCard;