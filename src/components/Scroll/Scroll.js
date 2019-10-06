import React, { Component } from 'react';
import styles from './Scroll.module.css';

import { Box, ResponsiveContext } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

class Scroll extends Component {
    state = { viewObjectsList: [] };

    componentDidMount() {
        this.setState({ viewObjectsList: [
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 1 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 2 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 3 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 }
        ] })
    }

    onArrowClick = (direction) => {
        if (direction === 'forward') {
            console.log(direction);
            this.setState({viewObjectsList: [
                {title: '', coverage: 'https://i.pinimg.com/564x/74/26/f8/7426f8bdf968010ad4daa520c2a1cfd7.jpg', id: 1 },
                {title: '', coverage: 'https://i.pinimg.com/564x/74/26/f8/7426f8bdf968010ad4daa520c2a1cfd7.jpg', id: 2 },
                {title: '', coverage: 'https://i.pinimg.com/564x/74/26/f8/7426f8bdf968010ad4daa520c2a1cfd7.jpg', id: 3 },
                {title: '', coverage: 'https://i.pinimg.com/564x/74/26/f8/7426f8bdf968010ad4daa520c2a1cfd7.jpg', id: 4 }
            ]});

        } else {
            this.setState({img: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg'})
        }
    }

    render(props) {
        return(
            <Box direction='column' align='center' className={styles.scroll_container}>
                <h3 className={styles.header}>{this.props.header}</h3>
                <Box background='light_contrast' direction='column' align='center'>
                    <ResponsiveContext.Consumer>
                    {size => 
                        <Box 
                            flex 
                            pad='10px' 
                            direction='row' 
                            justify='around' 
                            gap='small' 
                            align='center'
                            >
                            <FormPrevious color='contrast' onClick={() => this.onArrowClick('back')} className={styles.arrow}></FormPrevious>
                                    {(size !== 'small') ? (
                                        this.props.objectList.map(({title, coverage, id}) => {
                                            return(this.props.object(title, coverage, id))
                                        })
                                    ): (
                                        this.props.objectList.slice(0, 3).map(({title, coverage, id}) => {
                                            return(this.props.object(title, coverage, id))
                                        })
                                    )}  
                            <FormNext color='contrast' onClick={() => this.onArrowClick('forward')} className={styles.arrow}></FormNext>
                        </Box>
                    }
                    </ResponsiveContext.Consumer>
                </Box>
            </Box>
        );
    }
}

export default Scroll;