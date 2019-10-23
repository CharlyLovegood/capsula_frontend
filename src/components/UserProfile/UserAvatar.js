import React from 'react';
import { Box, Menu } from 'grommet';
import { Add } from 'grommet-icons';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';
import { remote_url } from './../../helpers';


export default function UserAvatar(props) {
    const defaultAvatar = remote_url.images.user_default;

    const [avatar, setAvatar] = React.useState(props.avatar ? props.avatar : defaultAvatar);

    return (
        <Box direction='row' width='auto' align='center'>
            <Link to={'/user/' + props.id} className={styles.avatar_container}>
                <img
                    alt='Avatar'
                    src={avatar}
                    className={styles.small_avatar}
                    onError={()=>{setAvatar(defaultAvatar)}}
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