import React from 'react';
import styles from './Footer.module.css'
import { Box, Text } from 'grommet';

function Footer(props) {
    return (
        <Box
            direction='row'
            gap='small'
            pad='small'
            className={styles.container}
            background='brandDark'
            justify='center'
        >
            <Box direction='row' width='xxlarge' pad='10px'>
                <Box direction='column'>
                    <Text>Bookovsky</Text>
                    <Text>
                        © 2019 Bookovsky. Сервис для обмена книгами
                    </Text>
                    <Text>
                        Мы в соцсетях
                    </Text>
                    <Box direction='row'>
                        <a title='telegram' href='https://t.me/booookovsky'>
                            <img className={styles.icon} src='https://image.flaticon.com/icons/svg/1604/1604538.svg' />
                        </a>
                    </Box>
                </Box>
                <Box direction='column'>
                    <Text></Text>
                    
                </Box>
            </Box>

        </Box>
    )
}

export default Footer;