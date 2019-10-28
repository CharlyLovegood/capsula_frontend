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
            <Box pad='medium' gap='small' width='medium'>
                <Heading level={3} margin='none'>
                    Подтверждение
                </Heading>
                <Text>Вы уверены, что хотите отправить заявку на обмен?</Text>
                <Box
                    as='footer'
                    gap='small'
                    direction='row'
                    align='center'
                    justify='end'
                    pad={{ top: 'medium', bottom: 'small' }}
                >
                    <Link to='/swap'>
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