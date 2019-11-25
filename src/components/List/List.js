import React, { Component } from 'react';
import ListElement from './ListElement';
import styles from './List.module.css';

import { Box } from 'grommet';


class List extends Component {
    render() {
        return (
            <Box className={styles.scroll_container} flex direction='column' justify='start' align='center' fill>
                <Box className={styles.scroll_page}>
                    {this.props.objectList.map((object) => {
                        return(<ListElement key={object.id} swapRequest={this.props.swapRequest} {...object}></ListElement>);
                    })}
                </Box>
            </Box>
        );
    }
}

export default List;