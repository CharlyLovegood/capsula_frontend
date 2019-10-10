import React, { Component } from 'react';
import styles from './Gallery.module.css';

import { Box } from 'grommet';

class Gallery extends Component {
    state = { objectsList: [] };

    componentDidMount() {
        this.setState({ objectsList: [
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 1 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 2 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 3 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 }
        ] })
    }

    render(props) {
        return (
            <Box direction='column' align='center' className={styles.gallery_box}>
                <h2>{this.props.header}</h2>
                <Box 
                    width='900px' 
                    flex 
                    direction='row' 
                    wrap
                    justify='center' 
                    align='center'
                    alignSelf='center'
                    >
                    {this.props.objectList.map(({title, coverage, id}) => {
                        return(this.props.object(title, coverage, id))
                    })}
                </Box>
            </Box>
        );
    }
}

export default Gallery;