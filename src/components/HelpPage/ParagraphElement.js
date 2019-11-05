import React from 'react';
import { Box, Button, Text } from 'grommet';
import SizeComponent from '../SizeComponent/SizeComponent';
// import styles from './HelpPage.module.css';

function ParagraphElement(props) {
    // const l = props.align === 'start' ? styles.lt : styles.lb;
    // const r = props.align === 'start' ? styles.rb : styles.rt;
    // const rAlign = props.align === 'start' ? 'start' : 'end';
    // const lAlign = props.align === 'start' ? 'end' :'start';
    return (
        <SizeComponent>
        {size => 
            <Box  
                alignSelf={props.align}
                direction='row' 
                margin={{vertical: '20px', horizontal:'0px'}}
                fill
            >
                {/* <Box  margin={{vertical: '0px', horizontal:'-20px'}} alignSelf={rAlign} width='50px' height='50px' className={r} ></Box> */}
                <Box  pad={{vertical: '0px'}} width='100%'>
                    <Text textAlign='start' alignSelf='center' margin={{vertical: '5px'}}>{props.text}</Text>
                </Box>
                {/* <Box alignSelf={lAlign} width='50px' height='50px' className={l}></Box> */}
            </Box>
        }
        </SizeComponent>
    )
}

export default ParagraphElement;