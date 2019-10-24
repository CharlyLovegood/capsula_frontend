import { Carousel, Image, Box } from 'grommet';
import React, { Component } from 'react';
import { remote_url } from './../../helpers';
import style from './Banner.module.css';

class Banner extends Component {
    render() {
        return (
            <Box
                height='600px'
                width='900px'
            >
                {/* <Box className={style.container}>
                    <img src={remote_url.images.banner} className={style.banner}></img>
                </Box> */}
                <Carousel fill  controls='selectors'>
                    <Image style={{transform: 'rotate(90)'}} fit='cover' src={remote_url.images.banner} />
                </Carousel> 
            </Box>
        )
    }
}

export default Banner;