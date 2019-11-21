// import React from 'react';
// import { Box, Text } from 'grommet';
// import styles from './HomePage.module.css';

// function Element(props) {
//     return (
//         <Box margin='10px' 
//             align='center' 
//             width={props.width}
//             height='200px' 
//             pad='10px'
//             elevation='medium'
//             round='0px'
//             className={styles.element}
//             justify='end'
//         >
//             {/* <Box margin='10px'>
//                 {props.icon}
//             </Box> */}


//             <div className={styles.video}>
//                 <video className={styles.video__content} autoPlay muted loop>
//                     <source src={props.source} type="video/mp4"></source>
//                     Your browser is not supported!
//                 </video>
//             </div>
//             <Box justify='center' height='60%' pad='10px'>
//                 <Text textAlign='center' color='#444242' size='24px'>{props.text}</Text>
//             </Box>
//         </Box>
//     )
// }

// export default Element;





import React from 'react';
import { Box, Text } from 'grommet';
import styles from './HomePage.module.css';

function Element(props) {
    return (
        <Box margin='10px' 
            align='center' 
            width={props.width}
            height='240px' 
            pad='10px'
            elevation='xsmall'
            round='12px'
            className={styles.element}
        >
            <Box margin='10px'>
                {props.icon}
            </Box>

            <Text textAlign='center' color='brandDark' size='25px'>{props.text}</Text>
        </Box>
    )
}

export default Element;