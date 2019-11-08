import React from 'react';
import { Box, Text } from 'grommet';

function Element(props) {
    return (
        <Box margin='10px' 
            align='center' 
            width={props.width}
            height='240px' 
            pad='10px'
            elevation='xsmall'
            round='12px'
            className={props.style}
        >
            <Box margin='10px'>
                {props.icon}
            </Box>

            <Text textAlign='center' color='brandDark' size='20px'>{props.text}</Text>
        </Box>
    )
}

export default Element;