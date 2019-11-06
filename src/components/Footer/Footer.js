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
                        © 2019 Bookovsky. Приложение для обмена книгами
                    </Text>
                    <Text>
                        Мы в соцсетях
                    </Text>
                    <Box direction='row'>
                        <img className={styles.icon} src='https://image.flaticon.com/icons/svg/372/372393.svg' />
                        <img className={styles.icon} src='https://image.flaticon.com/icons/svg/372/372414.svg' />
                        <img className={styles.icon} src='https://image.flaticon.com/icons/svg/372/372410.svg' />
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