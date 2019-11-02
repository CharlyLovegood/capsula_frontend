import React from 'react';
import { Box, Text } from 'grommet';
import SizeComponent from '../SizeComponent/SizeComponent';



function Element(props) {
    return (
        <SizeComponent>
            {size =>
            <Box margin='10px' 
                align='center' 
                width={props.width}
                height='240px' 
                pad='10px'
                elevation='xsmall'
                round='5px'
            >
                <Box margin='10px'>
                    {props.icon}
                </Box>

                <Text textAlign='center' color='brandDark'>{props.text}</Text>
            </Box>}
        </SizeComponent>
    )
}

export default Element;