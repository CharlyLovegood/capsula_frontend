import { Box, Heading, Button, Text } from 'grommet';
import React, { Component } from 'react';
import { remote_url } from './../../helpers';
import style from './Banner.module.css';
import {Link} from 'react-router-dom';

class Banner extends Component {
    render() {
        if (this.props.size === 'small') {
            return(
            <Box className={style.title_box} fill direction='column' align='center'>
                <Box className={style.box} height='500px' width='100%'>
                </Box>
                
                <Box pad='10px' margin={{horizontal:'20px', vertical: '-20px'}} background='white' align='center' className={style.title_box}>
                    <Heading size='40px' color='black' margin={{horizontal:'0px', vertical: '0px'}} textAlign='center' alignSelf='center' level='1'>Рай – это место, где библиотека открыта двадцать четыре часа в сутки, семь дней в неделю. Нет… восемь дней в неделю. А. Брэдли</Heading>
                    {!this.props.user.loggedIn &&
                        <Box margin={{vertical:'20px'}} direction='column' align='start' justify='start' width='90%'>
                            <Box fill>
                                <Link color='textColor' to='/register'>
                                    <Button color='brandGradient' margin={{vertical:'5px'}} fill='horizontal' primary label={<Text size='23px'>Присоединиться</Text>}></Button>
                                </Link>
                            </Box>
                            <Box fill>
                                <Link color='textColor' to='/login'>
                                    <Button margin={{vertical:'5px'}} fill='horizontal' label={<Text size='23px' color='brand'>Войти</Text>}></Button>
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
                    <Heading size='40px' color='black' level='1'>Рай – это место, где библиотека открыта двадцать четыре часа в сутки, семь дней в неделю.</Heading>
                    
                    {!this.props.user.loggedIn &&
                        <Box margin={{vertical:'20px'}} direction='column' align='start' justify='start'>
                            <Box fill>
                                <Link color='textColor' to='/register'>
                                    <Button color='brandGradient' margin={{vertical:'5px'}} fill='horizontal' primary label={<Text size='23px'>Присоединиться</Text>}></Button>
                                </Link>
                            </Box>
                            <Box fill>
                                <Link color='textColor' to='/login'>
                                    <Button margin={{vertical:'5px'}} fill='horizontal' label={<Text size='23px' color='brand'>Войти</Text>}></Button>
                                </Link>
                            </Box>
                        </Box>
                    }
                </Box>
                <Box animation='slideUp' height='100%' width='70%' className={style.box}>
                </Box>

                {/* <Box className={style.container}>
                    <img src={remote_url.images.banner} className={style.banner}></img>
                </Box> */}
            </Box>
        )
    }
}

export default Banner;