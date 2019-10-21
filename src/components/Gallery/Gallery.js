import React, { Component } from 'react';
import styles from './Gallery.module.css';

import { Box } from 'grommet';

class Gallery extends Component {
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
        if (this.props.contentType === 'books') {
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
                                {this.props.objectList.map((element) => {
                                    return(this.props.object(element.book.title, element.image, element.id, element.book.id));
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
                        {this.props.objectList.map((element) => {
                            return(this.props.object(element.book.title, element.image, element.id));
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
                        {this.props.objectList.map((element) => {
                            return(this.props.object(element.book.title, element.image, element.id));
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
        } else {
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
                    {this.props.objectList.map(({authors, book, date, genre, id, image, reader, status}) => {
                        return(this.props.object(authors, book, date, genre, id, image, reader, status, this.props.type))
                    })}

                    </Box>
                </Box>
            );
        }

    }
}

export default Gallery;