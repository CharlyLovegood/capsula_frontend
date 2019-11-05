import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './PrivateLink.module.css';
import { Box } from 'grommet';


const PrivateLink = (props) => {
    return (
        <NavLink activeClassName={styles.active} className={styles.box} to={props.to}> 
            {/* <Button {...props} margin='small' plain className={styles.link} /> */}
            <Box margin='12px' className={styles.link}>{props.label}</Box>
        </NavLink>
    );
}


const PrivateLinkMobile = (props) => {
    return (
        <NavLink activeClassName={styles.active} className={styles.box} to={props.to}> 
            {/* <Button {...props} margin='small' plain className={styles.link} /> */}
            <Box margin='5px' className={styles.link}>{props.label}</Box>
        </NavLink>
    );
}

export { PrivateLink, PrivateLinkMobile };