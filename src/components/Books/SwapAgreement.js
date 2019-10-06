import React from 'react';

import { Link } from 'react-router-dom';

import { Box, Button, Heading, Text } from 'grommet';

const SwapAgreement = (props) => {
    return (
        <Box pad='medium' gap='small' width='medium'>
            <Heading level={3} margin='none'>
                Confirm
            </Heading>
            <Text>Are you sure you want to swap?</Text>
            <Box
                as='footer'
                gap='small'
                direction='row'
                align='center'
                justify='end'
                pad={{ top: 'medium', bottom: 'small' }}
            >
                <Link to='/swap'>
                    <Button label='Yes' color='dark-3' />
                </Link>
                <Button
                    label={
                        <Text color='white'>
                            <strong>No</strong>
                        </Text>
                    }
                    onClick={props.onClose}
                    primary
                    color='status-critical'
                />
            </Box>
        </Box>
    )
}
export default SwapAgreement;