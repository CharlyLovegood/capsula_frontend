import React from 'react';
import { Box, Button } from 'grommet';
import Book from './Book';


function BookCard(props) {
    return (
        <Box direction='row' align='center' background='light_contrast' margin='15px'>
            <Book size='small' title={props.title} coverage={props.coverage} key={props.id}></Book>
            <Box width='100px' direction='column' pad='20px'>
                <h3>Book</h3>
                <p>status</p>
            </Box>
            <Button fill='vertical' label='Cancel'></Button>
        </Box>
    )
}

export default BookCard;