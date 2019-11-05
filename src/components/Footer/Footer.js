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
            background='brandGradient'
            height='150px'
        >
        </Box>
    )
}

export default Footer;