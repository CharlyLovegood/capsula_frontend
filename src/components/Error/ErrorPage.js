import React, { Component } from 'react';
import { Box } from 'grommet';
import { remote_url } from './../../helpers';


class ErrorPage extends Component {
    render() {
        return (
            <Box 
                direction='row'
                align='center'
                baseline='center'
                justify='start'
                width='xxlarge'
                height='630px'
                // margin='20px'
            >
                <Box elevation='medium' margin='10px' fill='vertical' width='50%' background={`url(${remote_url.images.error})`}>
                    {/* <img src={remote_url.images.error} alt='error 404'></img> */}
                </Box>

                <Box margin='10px' fill='vertical' align='start' width='50%' justify='start' direction='column'>
                    <h2>Упс... Что-то пошло не так</h2>
                    <p>{this.props.alert ? 'Ошибка: ' + this.props.alert : ''}</p>
                    <p>Спокойно, возможно, мы уже знаем про эту ошибку и скоро ее исправим. 
                        Но если тебе небезразлична судьба нашего проекта, сообщи нам о том, что привело к ошибке</p>
                    <p>Нам также будет интересно получить обратную связь - узнать, чего тебе не хватает по функционалу, что хотелось бы добавить :)</p>
                    <p>
                        Наш telegram чат: <a href='https://t.me/booookovsky'>t.me/booookovsky</a>
                    </p>
                </Box>
            </Box>
        )
    }
}

export default ErrorPage;