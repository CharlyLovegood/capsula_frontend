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
                                <Button margin='5px' color='brand' fill='vertical' label='Принять' onClick={() => props.handleAccept(props.id)}></Button>
                                <Button margin='5px' color='dark-3' fill='vertical' label='Отклонить' onClick={() => props.handleReject(props.id)}></Button>
                            </Box>);
            break;
        case 'request':
            ButtonBlock = (<Button margin='5px' fill='vertical' label='Отменить' onClick={() => props.handleReject(props.id)}></Button>);
            break;
        case 'inProcess':
            ButtonBlock = (<Button margin='5px' fill='vertical' label='Получено' onClick={() => props.handleBookDelivered(props.id)}></Button>);
            break;
        case 'onHands':
            ButtonBlock = (<Button margin='5px' fill='vertical' label='Возвращено' onClick={() => props.handleFinishSwap(props.id)}></Button>); 
            break;
        default:
            ButtonBlock = (<Box></Box>);
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
                <h3 className={styles.text_header}>{props.title}</h3>
                {props.owner &&
                    <p className={styles.text}>Владелец: <Link to=''>{props.owner}</Link></p>
                }
                {props.reader &&
                    <p className={styles.text}>Запрос отправлен: <Link to=''>{props.reader}</Link></p>
                }
                <p className={styles.text}>Дата: {props.date}</p>
            </Box>
            <Box width='162px'>
                {ButtonBlock}
            </Box>
        </Box>
    )
}

export default BookCard;