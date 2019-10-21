import { Carousel, Image, Box } from 'grommet';
import React, { Component } from 'react';
import { remote_url } from './../../helpers';

class Banner extends Component {
    render() {
        return (
            <Box
                height='600px'
                width='900px'
            >
                <Carousel fill  controls='selectors'>
                    <Image style={{transform: 'rotate(90)'}} fit='cover' src={remote_url.images.banner} />
                </Carousel>
            </Box>
        )
    }
}

export default Banner;