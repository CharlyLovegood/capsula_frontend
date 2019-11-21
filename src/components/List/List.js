import React, { Component } from 'react';
import ListElement from './ListElement';

import { Box } from 'grommet';


class List extends Component {
    render() {
        return (
            <Box flex direction='column' justify='start' align='center' fill>
                {this.props.objectList.map((object) => {
                    return(<ListElement key={object.id} swapRequest={this.props.swapRequest} {...object}></ListElement>);
                })}
            </Box>
        );
    }
}

export default List;