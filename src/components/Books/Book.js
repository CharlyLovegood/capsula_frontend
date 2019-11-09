import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from 'grommet';
import styles from './Book.module.css';

import SizeComponent from '../SizeComponent/SizeComponent';


function Book(props) {
    // const gradientList = [
    //     'linear-gradient(to top right, rgb(101, 115, 255), rgb(111, 114, 247), rgb(120, 114, 239), rgb(130, 113, 231), rgb(139, 112, 223), rgb(149, 111, 215), rgb(158, 111, 208), rgb(168, 110, 200), rgb(177, 109, 192), rgb(187, 108, 184), rgb(196, 108, 176), rgb(206, 107, 168));',
    //     'linear-gradient(to right, #c04848, #480048);',
    //     'linear-gradient(to right, #5f2c82, #49a09d)',
    //     'linear-gradient(to right, #4776e6, #8e54e9)',
    //     'linear-gradient(to right, #dd5e89, #f7bb97)'
    // ]
    // const max = 4;
    // const min = 0;
    // const rand = Math.floor(min + Math.random() * (max + 1 - min));

    const bookCoverage = `url("${props.coverage}")`;
    const background = props.coverage ? bookCoverage : 'brandDark';

    let link = '#'
    if (props.id > 0) {
        link = '/book/' + props.id;
    }
    
    return (
        <Link to={link}>
            <SizeComponent>
                {size => 
                <Box key={props.id} className={styles.book} background={background} 
                    width={size >= 424 || props.big ? 'book-width' : 'book-small-width'}
                    height={size >= 424 || props.big ? 'book-height' : 'book-small-height'}
                    margin={props.margin}
                    animation={props.animation}>
                        { !props.coverage &&
                            <Box pad='10px' align='center' alignContent='center'>
                                <Text textAlign='center' color='white'><strong>{props.title}</strong></Text>
                                <Text color='white'>{props.author}</Text>
                            </Box>
                        }
                </Box>
                }
            </SizeComponent>
        </Link>
    )
}

export default Book;