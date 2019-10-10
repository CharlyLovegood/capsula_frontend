import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivateLink.module.css';
import { Button } from 'grommet';


const PrivateLink = (props) => {
    return (
        <Link to={props.to}> 
            <Button {...props} margin='small' plain className={styles.link}/>
        </Link>
    );
}

export default PrivateLink