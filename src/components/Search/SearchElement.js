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
            <Link className={styles.link} to={`/book/${props.id}`}>
                <Box
                    direction='row'
                    align='center'
                    gap='small'
                    pad='small'
                    className={styles.container}
                >
                    <Image
                        width='110px'
                        src={props.image}
                    />
                    <Box direction='column'>
                        
                        <strong>{props.name}</strong>
                        <strong>Автор: {props.author}</strong>
                    </Box>
                </Box>
            </Link>
        )
    }
}

export default SearchElement;