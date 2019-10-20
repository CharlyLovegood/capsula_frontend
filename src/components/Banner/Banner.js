import { Carousel, Image, Box } from 'grommet';
import React, { Component } from 'react';

class Banner extends Component {
    render() {
        return (
            <Box
                height='600px'
                width='900px'
            >
                <Carousel fill  controls='selectors'>
                    <Image style={{transform: 'rotate(90)'}} fit='cover' src='https://cdn.dribbble.com/users/2030268/screenshots/5922259/img_4x.jpg' />
                </Carousel>
            </Box>
        )
    }
}

export default Banner;