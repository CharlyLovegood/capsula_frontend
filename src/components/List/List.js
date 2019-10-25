import React, { Component } from 'react';
import styles from './List.module.css';
import ListElement from './ListElement';

import { Box } from 'grommet';


class List extends Component {
    render() {
        return (
            <Box flex direction='column' justify='center' align='center'>
                <h3 className={styles.main_text}>Рядом с вами</h3>

                {this.props.objectList.map((object) => {
                    return(<ListElement {...object}></ListElement>);
                })}
            </Box>
        );
    }
}

export default List;