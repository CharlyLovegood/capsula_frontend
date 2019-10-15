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
                    <Image fit='cover' src='http://www.lm-magazine.com/wp-content/uploads/2017/05/080.jpg?w=326&h=436' />
                </Carousel>
            </Box>
        )
    }
}

export default Banner;