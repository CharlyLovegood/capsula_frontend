import React, { Component } from 'react';
import styles from './Gallery.module.css';

import { Box } from 'grommet';
import SizeComponent from '../SizeComponent/SizeComponent';

class Gallery extends Component {
    calculateWidth(size, contentType) {
        if (contentType === 'books') {
            if (size >= 720) return '720px'
            else if (size >= 540) return '540px'
            else if (size >= 360) return '360px'
            else return '720px'
        }
        return '720px'
    }

    render() {
        return (
            <SizeComponent>
                {size => (
                    <Box direction='column' align='center' className={styles.gallery_box}>
                        <h2>{this.props.header}</h2>
                        <Box 
                            width={this.calculateWidth(size, this.props.contentType)} 
                            flex 
                            direction='row' 
                            wrap
                            justify='start' 
                            align='center'
                            >
                            {this.props.objectList.map((element) => {
                                return(this.props.object(element.book.title, element.image, element.book.genre, element.book.authors, element.id, element.book.id));
                            })}
                        </Box>
                    </Box>
                )}
            </SizeComponent>
        )
    }
}

export default Gallery;