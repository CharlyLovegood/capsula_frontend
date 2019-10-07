import React from 'react';
import { Box } from 'grommet';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';

export default function UserAvatar(props) {
  return (
        <Box direction='row' width='auto' align='center'>
            <Link to='/profile_id=1' className={styles.avatar_container}>
                <img
                    alt='Remy Sharp'
                    src='https://cdn.dribbble.com/users/1253590/screenshots/7221280/media/03e0c431c9196bdb0d32bbe5b030918c.png'
                    className={styles.small_avatar}
                />
            </Link>
            <h3 className={styles.name}>{props.name}</h3>
        </Box>
    );
}