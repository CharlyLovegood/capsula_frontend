import React from 'react';
import styles from './SearchElement.module.css'
import { Box, Image, Text } from 'grommet';
import { Link } from 'react-router-dom';

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
            <Link className={styles.link} to={`/book/${props.id}`}>
                <Text>
                    <strong>{props.name}</strong>
                </Text>
            </Link>
        </Box>
    )
}

export default SearchElement;