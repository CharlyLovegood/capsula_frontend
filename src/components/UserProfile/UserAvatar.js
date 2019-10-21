import React from 'react';
import { Box, Menu } from 'grommet';
import { Add } from 'grommet-icons';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';
import { remote_url } from './../../helpers';


export default function UserAvatar(props) {
    return (
        <Box direction='row' width='auto' align='center'>
            <Link to={'/user/' + props.id} className={styles.avatar_container}>
                <img
                    alt='Remy Sharp'
                    src={props.avatar ? props.avatar : remote_url.images.user_default}
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