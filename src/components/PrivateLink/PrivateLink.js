import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivateLink.module.css';
import { Button } from 'grommet';


const PrivateLink = (props) => {
    return (
        <Link to={props.to}> 
            <Button margin='small' plain label={props.label} className={styles.link}/>
        </Link>
    );
}

export default PrivateLink