import React, { Component } from 'react';
import styles from './Gallery.module.css';

import { Box } from 'grommet';
import SizeComponent from '../SizeComponent/SizeComponent';

class Gallery extends Component {
    calculateWidth(size, contentType) {
        if (contentType === 'books') {
            if (size >= 1000) return 'xxlarge'
            else if (size >= 800) return 'xlarge'
            else if (size >= 600) return 'large'
            else if (size >= 424) return 'medium'
            else if (size >= 280) return '280px'
            else return 'xlarge'
        }
        if (contentType === 'smart-books') {
            if (size >= 1000) return 'xxlarge'
            else if (size >= 800) return 'xlarge'
            else if (size >= 600) return 'large'
            else if (size >= 400) return 'medium'
            else if (size >= 200) return 'small'
            else return 'xlarge'
        }
        return 'xxlarge'
    }

    render() {
        return (
            <SizeComponent>
                {size => (
                    <Box direction='column' align='center' className={styles.gallery_box}>
                        <h2 className={styles.header}>{this.props.header}</h2>
                        <Box 
                            width={this.calculateWidth(size, this.props.contentType)} 
                            flex 
                            direction='row' 
                            wrap
                            justify='start' 
                            align='center'
                        >
                            {(this.props.contentType === 'books' || this.props.contentType === 'smart-books') && this.props.objectList.map((element) => {
                                return(this.props.object(element.book.title, element.image, element.book.genre, element.book.authors, element.id, element.book.id));
                            })}

                            {this.props.contentType === 'swaps' && this.props.objectList.map(({authors, book, date, genre, id, image, reader, owner, status}) => {
                                return(this.props.object(authors, book, date, genre, id, image, reader, owner, status, this.props.type))
                            })}
                            {this.props.objectList.length === 0 &&
                                <Box fill align='center' color='black'>{this.props.message}</Box>
                            }
                        </Box>
                    </Box>
                )}
            </SizeComponent>
        )
    }
}

export default Gallery;