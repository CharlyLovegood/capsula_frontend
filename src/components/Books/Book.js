import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from 'grommet';
import styles from './Book.module.css';

import SizeComponent from '../SizeComponent/SizeComponent';

import { remote_url } from './../../helpers';

function Book(props) {
    const defaultCoverage = remote_url.images.default_book;
    const background = props.coverage ? props.coverage : defaultCoverage;

    let link = '#'
    if (props.id > 0) {
        link = '/book/' + props.id;
    }
    
    return (
        <SizeComponent>
            {size => 
            <Box align='center' justify='center' direction='column'>
                <Link to={link}>
                    <Box key={props.id} className={styles.book} 
                        width={size >= 424 || props.big ? 'book-width' : 'book-small-width'}
                        height={size >= 424 || props.big ? 'book-height' : 'book-small-height'}
                        margin={props.margin}
                        animation={props.animation}
                        background={`url("${background}")`}>
                            { !props.coverage &&
                                <Box pad='10px' align='center' alignContent='center'>
                                    <Text textAlign='center' color='white'><strong>{props.title}</strong></Text>
                                    <Text textAlign='center' color='white'>{props.author}</Text>
                                </Box>
                            }
                    </Box>
                </Link>
                    {props.info &&
                        <Box textAlign='center' width={size >= 424 || props.big ? 'book-width' : 'book-small-width'} align='center' justify='center'>
                            <Text textAlign='center' size='18px' color='black'>{props.title.length <= 19 ? props.title : props.title.slice(0,18)+'...'}</Text>
                            <Text textAlign='center' size='15px' color='#756d6d'>{props.author}</Text>
                        </Box >
                    }
            </Box>
            }
        </SizeComponent>
    )
}

export default Book;