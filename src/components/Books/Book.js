import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';

import { remote_url } from './../../helpers';


function Book(props) {
    const defaultCoverage = remote_url.images.default_book;
    const [bookCoverage, setBookCoverage] = React.useState(props.coverage ? props.coverage :  defaultCoverage);
    let link = '#'
    if (props.id > 0) {
        link = '/book/' + props.id;
    }
    

    return (
        <Link to={link}>
            <Box background={`url(${bookCoverage})`} 
                width='book-width' 
                height='book-height'
                margin={props.margin}
                animation={props.animation}>
            </Box>
        </Link>
    )
}

export default Book;