import React from 'react';
import { Box } from 'grommet';

function Loader(props) {
    console.log('ddd')
    return(
        // <div className="lds-roller">
        //     <div>
        //     </div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        // </div>
        <Box height='400px' width='400px' background='url(https://cdn.dribbble.com/users/179112/screenshots/3485399/oscar-dribbble-loader-2.gif)'>
        </Box>
    )
}

export default Loader;