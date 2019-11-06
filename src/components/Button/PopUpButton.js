import React from 'react';

import { Box, Button, Layer, Text } from 'grommet';

const PopUpButton = (props) => {
    const [open, setOpen] = React.useState();

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    return (
        <Box fill='horizontal' align='center' justify='center'>
            <Box fill='horizontal' align='center' justify='center'>
                <Button
                    icon={props.icon}
                    label={
                        <Text>
                            <strong>{props.label}</strong>
                        </Text>
                    }
                    onClick={onOpen}
                    fill='horizontal'
                    {...props}
                />
            </Box>
            {open && (
                <Layer position='center' modal onClickOutside={onClose} onEsc={onClose}>
                    { props.innerObject(onClose, props.forceUpdate) }
                </Layer>
            )}
        </Box>
    );
};

export default PopUpButton;