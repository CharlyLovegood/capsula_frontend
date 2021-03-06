import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import styles from './Book.module.css';
 
import { Box, Button, Heading, Text } from 'grommet';

class SwapAgreement extends Component {
    swapRequest() {
        this.props.swapRequest(this.props.bookId);
    }

    render() {
        return (
            <Box pad='medium' gap='small' width='medium' fill align='center'>
                <Box className={styles.scroll_container}>
                    <Box className={styles.scroll_page}>
                        <Heading level={3} margin='none'>
                            Подтверждение
                        </Heading>
                        <Text>Вы уверены, что хотите отправить заявку на обмен?</Text>
                        <Text>
                            После этого владелец книги получит вашу заявку. 
                            Одобренную заявку и контакты владельца ты сможешь найти в “Ждут передачи” раздела Читатель. 
                            Чтобы договориться о передаче книги, свяжись с владельцем книги удобным для тебя способом.
                        </Text>
                        <Text alignSelf='start'>
                            Более подробно о правилах сервиса вы можете узнать во вкладке Правила
                        </Text>
                        <Box
                            as='footer'
                            gap='small'
                            direction='row'
                            align='center'
                            justify='end'
                            pad={{ top: 'medium', bottom: 'small' }}
                        >
                            <Link to='/reader'>
                                <Button onClick={() => this.swapRequest()} label={
                                    <Text color='white'>
                                        <strong>Да</strong>
                                    </Text>
                                } primary />
                            </Link>
                            <Button
                                label='Нет'
                                onClick={this.props.onClose}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default SwapAgreement;