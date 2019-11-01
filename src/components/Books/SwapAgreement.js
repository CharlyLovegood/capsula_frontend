import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import { Box, Button, Heading, Text } from 'grommet';

class SwapAgreement extends Component {
    swapRequest() {
        const book = {
            "book_id": this.props.bookId
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': 'Token ' + localStorage.token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }
    
        return fetch('/library/swaps/', requestOptions)
            .then(response => {
                return response;
            });
    }

    render() {
        return (
            <Box pad='medium' gap='small' width='medium' fill align='center'>
                <Heading level={3} margin='none'>
                    Подтверждение
                </Heading>
                <Text>Вы уверены, что хотите отправить заявку на обмен?</Text>
                <Text>
                    После этого владелец книги получит вашу заявку. 
                    Если он решит принять ее, заявка перейдет из раздела "Заявки" в "В процессе" (вкладка Читатель), где вам станут доступны контакты владельца.
                    Если же владелец отклонит заявку, она перейдет во вкладку "История".
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
                        <Button onClick={() => this.swapRequest()} label='Да' color='dark-3' />
                    </Link>
                    <Button
                        label={
                            <Text color='white'>
                                <strong>Нет</strong>
                            </Text>
                        }
                        onClick={this.props.onClose}
                        primary
                        color='status-critical'
                    />
                </Box>
            </Box>
        )
    }
}
export default SwapAgreement;