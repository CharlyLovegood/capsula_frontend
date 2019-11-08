import React from 'react';
import { Box, Text } from 'grommet';
import SizeComponent from '../SizeComponent/SizeComponent';

function ParagraphElement(props) {
    return (
        <SizeComponent>
        {size => 
            <Box  
                alignSelf={props.align}
                direction='row' 
                margin={{vertical: '20px', horizontal:'0px'}}
                fill
            >
                <Box  pad={{vertical: '0px'}} width='100%'>
                    <Text textAlign='start' alignSelf='center' margin={{vertical: '5px'}}>{props.text}</Text>
                </Box>
            </Box>
        }
        </SizeComponent>
    )
}

export default ParagraphElement;