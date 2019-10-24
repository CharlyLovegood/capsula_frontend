import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivateLink.module.css';
import { Button } from 'grommet';
import { Box } from '@material-ui/core';


const PrivateLink = (props) => {
    return (
            <Link className={styles.box} to={props.to}> 
                <Button {...props} margin='small' plain className={styles.link} />
            </Link>
    );
}

export default PrivateLink