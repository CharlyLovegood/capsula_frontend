import React from 'react';
import { Box } from 'grommet';

import {Select, Text } from 'grommet';
import {genresArray, genres} from './../../helpers'


function Filter(props) {
    const [option, setOption] = React.useState();

    return (
            <Select options={genresArray} onChange={({ option }) => {
                setOption(option);
                props.updateGenre(genres[option]);
            }} valueLabel={
                <Box width='180px'
                    margin='6px'
                    height='41px'
                    pad='8px'
                    overflow="hidden"
                    align='start'
                    justify='center'
                >
                    <Text>{option}</Text>
                </Box>
            }>
            </Select>
    )
}

export default Filter;