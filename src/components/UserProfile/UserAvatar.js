import React from 'react';
import { Box, Menu } from 'grommet';
import { Add } from 'grommet-icons';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';

export default function UserAvatar(props) {
  return (
        <Box direction='row' width='auto' align='center'>
            <Link to='/user/1' className={styles.avatar_container}>
                <img
                    alt='Remy Sharp'
                    src={props.avatar ? props.avatar : 'https://i.pinimg.com/564x/08/1f/b1/081fb1c4f463c09c0191d27ebdeb3c2e.jpg'}
                    className={styles.small_avatar}
                />
            </Link>
            <Menu
                dropProps={{ align: { top: "bottom", left: "left" } }}
                label={props.name}
                items={[
                    { icon: <Add></Add> ,label: 'Action', onClick: () => {} },
                    { label: "Abort", onClick: () => {} },
                    { label: "Disabled", disabled: true }
                ]}
            />
        </Box>
    );
}