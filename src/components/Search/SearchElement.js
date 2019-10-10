import React from 'react';
import styles from './SearchElement.module.css'
import { Box, Image, Text } from 'grommet';

function SearchElement(props) {
    return (
        <Box
            direction='row'
            align='center'
            gap='small'
            pad='small'
            className={styles.container}
        >
            <Image
                width='48px'
                src={props.imageUrl}
                style={{ borderRadius: '100%' }}
            />
            <Text>
                <strong>{props.name}</strong>
            </Text>
        </Box>
    )
}

export default SearchElement;