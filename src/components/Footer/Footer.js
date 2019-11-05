import React from 'react';
import styles from './Footer.module.css'
import { Box } from 'grommet';

function Footer(props) {
    return (
        <Box
            direction='row'
            align='center'
            gap='small'
            pad='small'
            className={styles.container}
            background='brandDark'
            height='150px'
        >
            <Box direction='row'>
                <Box direction='column'>
                    <Text>Bookovsky</Text>
                    <Text>
                        © 2019 Bookovsky. Приложение для обмена книгами
                    </Text>
                    <Text>
                        Мы в соцсетях
                    </Text>
                </Box>
                <Box direction='column'>
                    <Text></Text>
                </Box>
            </Box>

        </Box>
    )
}

export default Footer;