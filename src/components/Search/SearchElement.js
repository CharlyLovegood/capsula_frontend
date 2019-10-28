import React from 'react';
import styles from './SearchElement.module.css'
import { Box, Image, Text } from 'grommet';
import { Link } from 'react-router-dom';

function SearchElement(props) {
    if (props.id === 'no res') {
        return(        
        <Box
            direction='row'
            align='center'
            gap='small'
            pad='small'
            className={styles.container}
        >
            <Text>
                <strong>{props.name}</strong>
            </Text>
        </Box>)
    } else {
        return (
            <Box
                direction='row'
                align='center'
                gap='small'
                pad='small'
                className={styles.container}
            >
                <Image
                    width='70px'
                    src={props.image}
                />
                <Box direction='column'>
                    <Link className={styles.link} to={`/book/${props.id}`}>
                        <strong>{props.name}</strong>
                    </Link>
                    <strong>Автор: {props.author}</strong>
                </Box>
            </Box>
        )
    }
}

export default SearchElement;