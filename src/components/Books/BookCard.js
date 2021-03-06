import React from 'react';
import { Box, Button } from 'grommet';
import Book from './Book';
import { Link } from 'react-router-dom';
import styles from './Book.module.css';
import SizeComponent from '../SizeComponent/SizeComponent';

import { swapStatuses, swapResults } from '../../helpers/constants';


function BookCard(props) {
    let ButtonBlock = (<Button></Button>);
    switch (props.type) {
        case 'proposal':
            ButtonBlock = (<Box width='140px' direction='column' gap='5px'>
                                <Button margin='5px' color='brand'  label='Принять' onClick={() => props.handleAccept(props.id)}></Button>
                                <Button margin='5px' color='dark-3'  label='Отклонить' onClick={() => props.handleReject(props.id)}></Button>
                            </Box>);
            break;
        case 'request':
            ButtonBlock = (<Button margin='5px' label='Отменить' onClick={() => props.handleCancel(props.id)}></Button>);
            break;
        case 'inProcess':
            if (props.owner) {
                ButtonBlock = (<Button margin='5px' label='Получено' onClick={() => props.handleBookDelivered(props.id)}></Button>);
            } else if (props.reader) {
                ButtonBlock = (<Box></Box>); 
            }
            break;
        case 'onHands':
            if (props.reader) {
                ButtonBlock = (<Button margin='5px' label='Возвращено' onClick={() => props.handleFinishSwap(props.id)}></Button>); 
            } else if (props.owner) {
                ButtonBlock = (<Box></Box>); 
            }
            break;
        default:
            ButtonBlock = (<Box></Box>);
            break;
    }
    
    
    return (
        <SizeComponent>
        {size => 
            <Box  
                direction='row' 
                width={size >= 1000 ? '480px' : '100%'}
                background='light_contrast' 
                margin='10px'
            >
                <Book size='small' 
                    title={props.book.title} 
                    coverage={props.coverage} 
                    id={props.book.id} 
                    author=''>
                </Book>

                <Box margin='10px' direction='row' wrap>
                    <Box 
                        direction='column' 
                        pad='10px'
                    >
                        <h3 className={styles.text_header}>{props.book.title}</h3>
                        
                        {props.owner &&
                            <Box>
                            <p className={styles.text}>Владелец: <Link to={`/user/${props.owner.id}`}>{props.owner.name}</Link></p>
                            {(props.status === swapStatuses.ACCEPTED || props.status === swapStatuses.READING) &&
                                <Box>
                                    <p className={styles.text}>email: {props.owner.email}</p>
                                    <p className={styles.text}>vk: {props.owner.vk || 'не указан'}</p>
                                </Box>
                            }
                            </Box>
                        }

                        {props.reader &&
                            <Box>
                                <p className={styles.text}>Читатель: <Link to={`/user/${props.reader.id}`}>{props.reader.name}</Link></p>
                                {(props.status === swapStatuses.ACCEPTED || props.status === swapStatuses.READING) &&
                                    <Box>
                                        <p className={styles.text}>email: {props.reader.email}</p>
                                        <p className={styles.text}>vk: {props.reader.vk || 'не указан'}</p>
                                    </Box>
                                }
                            </Box>
                        }

                        {props.user &&
                            <Box>
                                <p className={styles.text}>Участник обмена: <Link to={`/user/${props.user.id}`}>{props.user.name}</Link></p>
                                <p className={styles.text}>Состояние: {swapResults[props.history]}</p>
                            </Box>
                        }
                        <p className={styles.text}>Дата: {props.date}</p>
                    <Box align='start'>
                        {ButtonBlock}
                    </Box>
                    </Box>
                    
                </Box>
            </Box>
        }
        </SizeComponent>
    )
}

export default BookCard;