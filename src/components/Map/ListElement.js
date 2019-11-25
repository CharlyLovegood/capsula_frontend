import React from 'react';
import { SubtractCircle } from 'grommet-icons';

import { Box, Button, Text } from 'grommet';

function ListElement(props) {
        return (
           <Box pad='5px' round='5px' border={{}} fill='horizontal' direction='row' justify='between'>
               <Box pad='10px'>
                    <Text>
                            {props.name}
                    </Text>
               </Box>
               
               <Button onClick={props.deleteMarker} icon={<SubtractCircle color='brand' />}>
               </Button>
           </Box>
        )
}

export default ListElement;