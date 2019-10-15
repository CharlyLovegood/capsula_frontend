import React, { Component } from 'react';

import { Box } from 'grommet';

class SizeContainer extends Component {
    constructor() {
        super();
        this.state = { 
            width: window.innerWidth,
            sizes: {
                big: 720,
                medium: 540,
                small: 360,
                xsmall: 180
            }
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    updateDimensions() {
        this.setState({
            width: window.innerWidth
        });
    }

    render(props) {
        let size = this.state.width;

        if (size >= 720) {
            return (
                <Box direction='column' align='center' className={styles.gallery_box}>
                    <h2>{this.props.header}</h2>
                        <Box 
                            width='720px' 
                            flex 
                            direction='row' 
                            wrap
                            justify='start' 
                            align='center'
                            >
                            {this.props.objectList.map(({title, coverage, id}) => {
                                return(this.props.object(title, coverage, id))
                            })}
                        </Box>
                </Box>
            );
        } else if (size >= 540) {
            return (
                <Box direction='column' align='center' className={styles.gallery_box}>
                    <h2>{this.props.header}</h2>
                    <Box 
                        width='540px' 
                        flex 
                        direction='row' 
                        wrap
                        justify='start' 
                        align='center'
                    >
                    {this.props.objectList.map(({title, coverage, id}) => {
                        return(this.props.object(title, coverage, id))
                    })}
                    </Box>
                </Box>
            );
        } else if (size >= 360) {
            return (
                <Box direction='column' align='center' className={styles.gallery_box}>
                    <h2>{this.props.header}</h2>
                    <Box 
                        width='360px' 
                        flex 
                        direction='row' 
                        wrap
                        justify='start' 
                        align='center'
                    >
                    {this.props.objectList.map(({title, coverage, id}) => {
                        return(this.props.object(title, coverage, id))
                    })}
                    </Box>
                </Box>
            );
        } else {
            return (
                <Box direction='column' align='center' className={styles.gallery_box}>
                    <h2>{this.props.header}</h2>
                    <Box 
                        width='180px' 
                        flex 
                        direction='row' 
                        wrap
                        justify='start' 
                        align='center'
                    >
                    {this.props.objectList.map(({title, coverage, id}) => {
                        return(this.props.object(title, coverage, id))
                    })}
                    </Box>
                </Box>
            );
        }

    }
}

export default SizeContainer;