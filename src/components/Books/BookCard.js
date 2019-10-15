import React from 'react';
import { Box, Button } from 'grommet';
import Book from './Book';

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
            margin='15px'
        >
            <Book size='small' title={props.title} coverage={props.coverage} key={props.id}></Book>
            <Box flex='grow' direction='column' pad='15px'>
                <h3>Book</h3>
                <p>status</p>
            </Box>
            <Box width='130px'>
                {ButtonBlock}
            </Box>
        </Box>
    )
}

export default BookCard;