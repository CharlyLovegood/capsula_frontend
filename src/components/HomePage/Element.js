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
                height='270px' 
                background='white'
                pad='20px'
                elevation='small'
                border={{ color: 'brandDark', size: 'small' }}
                round='5px'
            >
                <Box margin='20px'>
                    {props.icon}
                </Box>
                <Text textAlign='center' weight='bold' color='brandDark'>{props.text}</Text>
            </Box>}
        </SizeComponent>
    )
}

export default Element;