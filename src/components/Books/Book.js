import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'grommet';

import { remote_url } from './../../helpers';
import SizeComponent from '../SizeComponent/SizeComponent';


function Book(props) {
    const defaultCoverage = remote_url.images.default_book;
    const [bookCoverage, setBookCoverage] = React.useState(props.coverage ? props.coverage :  defaultCoverage);
    let link = '#'
    if (props.id > 0) {
        link = '/book/' + props.id;
    }
    
    return (
        <Link to={link}>
            <SizeComponent>
                {size => 
                <Box elevation='medium' background={`url(${bookCoverage})`} 
                    width={size >= 424 ? 'book-width' : 'book-small-width'}
                    height={size >= 424 ? 'book-height' : 'book-small-height'}
                    margin={props.margin}
                    animation={props.animation}>
                </Box>
                }
            </SizeComponent>
        </Link>
    )
}

export default Book;