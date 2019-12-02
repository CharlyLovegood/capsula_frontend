import { Box, Heading, Button, Text } from 'grommet';
import React, { Component } from 'react';
import style from './Banner.module.css';
import {Link} from 'react-router-dom';

class Banner extends Component {
    constructor(props) {
        super(props);
        const max = 3;
        const min = 0;
        const rand = Math.floor(min + Math.random() * (max + 1 - min));
        const headersShort = ['Сон — это хорошо, а книги еще лучше',
            'Читатель видит мир глазами тысячи людей',
            'Чтобы остановить время, не нужна волшебная палочка. Возьми чай и книгу',
            'Если у тебя есть книги, ты уже не одинок'];
        const headersLong = ['Рай – это место, где библиотека открыта двадцать четыре часа в сутки, семь дней в неделю',
            'Чтобы остановить время, не нужна волшебная палочка. Возьми чай и книгу',
            '— С чем  предпочитаете кофе? с сахаром, молоком, корицей? — Я предпочитаю с книгой',
            'Книги разбивают кандалы времени, доказывая, что люди способны на волшебство'];
        this.state = {
            headerLong: headersLong[rand],
            headerShort: headersShort[rand]
        };
    }


    render() {
        if (this.props.size === 'small') {
            return(
            <Box className={style.title_box} fill direction='column' align='center'>
                <Box className={style.box} height='500px' width='100%'>
                </Box>
                
                <Box pad='10px' 
                    margin={{horizontal:'20px', vertical: '-20px'}} 
                    background='white' 
                    align='center' 
                    className={style.title_box}
                >
                    <Heading size='40px' 
                        color='black' 
                        margin={{horizontal:'0px', vertical: '0px'}} 
                        textAlign='center' 
                        alignSelf='center'
                        level='1'
                    >
                        {this.state.headerShort}
                    </Heading>

                    {!this.props.user.loggedIn &&
                        <Box margin={{vertical:'20px'}} direction='column' align='start' justify='start' width='90%'>
                            <Box fill>
                                <Link color='textColor' to='/register'>
                                    <Button hoverIndicator={{dark: 'small'}} 
                                        color='brandGradient' 
                                        margin={{vertical:'5px'}} 
                                        fill='horizontal' 
                                        className={style.primary_button} 
                                        primary 
                                        label={<Text size='23px'><strong>Присоединиться</strong></Text>}>
                                    </Button>
                                </Link>
                            </Box>
                            <Box fill>
                                <Link color='textColor' to='/login'>
                                    <Button margin={{vertical:'5px'}} 
                                        fill='horizontal' 
                                        label={<Text size='23px' color='brand'><strong>Войти</strong></Text>}>
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    } 
                    {this.props.user.loggedIn &&
                        <Box margin={{vertical:'20px'}} direction='column' align='start' justify='start' width='90%'>
                            <Box fill>
                                <Link color='textColor' to='/search/1'>
                                    <Button hoverIndicator={{dark: 'small'}} 
                                        color='brandGradient' 
                                        margin={{vertical:'5px'}} 
                                        fill='horizontal' 
                                        className={style.primary_button} 
                                        primary 
                                        label={<Text size='23px'><strong>Найти книгу</strong></Text>}>
                                    </Button>
                                </Link>
                            </Box>
                            <Box fill>
                                <Link color='textColor' to={`/user/${this.props.user.user.id}/library`}>
                                    <Button margin={{vertical:'5px'}} fill='horizontal' label={<Text size='23px' color='brand'><strong>Добавить книгу</strong></Text>}></Button>
                                </Link>
                            </Box>
                        </Box>
                    } 
                </Box>
            </Box>
            )
        }
        return (
            <Box
                pad='10px'
                height='650px'
                width='100%'
                className={style.container}
                direction='row'
                justify='between'
            >
                <Box width='350px' direction='column'>
                    <Heading size='40px' color='black' level='1'>{this.state.headerLong}</Heading>
                    
                    {!this.props.user.loggedIn &&
                        <Box margin={{vertical:'20px'}} direction='column' align='start' justify='start'>
                            <Box fill>
                                <Link color='textColor' to='/register'>
                                    <Button margin={{vertical:'5px'}} 
                                        color='brandGradient' 
                                        className={style.primary_button} 
                                        fill='horizontal' 
                                        primary 
                                        label={<Text size='23px'><strong>Присоединиться</strong></Text>}>
                                    </Button>
                                </Link>
                            </Box>
                            <Box fill>
                                <Link color='textColor' to='/login'>
                                    <Button margin={{vertical:'5px'}} fill='horizontal' label={<Text size='23px' color='brand'><strong>Войти</strong></Text>}></Button>
                                </Link>
                            </Box>
                        </Box>
                    }
                    {this.props.user.loggedIn &&
                        <Box margin={{vertical:'20px'}} direction='column' align='start' justify='start' width='90%'>
                            <Box fill>
                                <Link color='textColor' to='/search/1'>
                                    <Button color='brandGradient' 
                                        margin={{vertical:'5px'}} 
                                        fill='horizontal' 
                                        className={style.primary_button} 
                                        primary 
                                        label={<Text size='23px'><strong>Найти книгу</strong></Text>}>
                                    </Button>
                                </Link>
                            </Box>
                            <Box fill>
                                <Link color='textColor' to={`/user/${this.props.user.user.id}/library`}>
                                    <Button margin={{vertical:'5px'}} fill='horizontal' label={<Text size='23px' color='brand'><strong>Добавить книгу</strong></Text>}></Button>
                                </Link>
                            </Box>
                        </Box>
                    } 
                </Box>
                <Box animation='slideUp' height='100%' width='70%' className={style.box}>
                </Box>
            </Box>
        )
    }
}

export default Banner;