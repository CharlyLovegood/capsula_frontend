import React from 'react';
import { Box, Menu, Text } from 'grommet';
import { UserSettings, Logout } from 'grommet-icons';
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
                pad='0px'
                dropProps={{ align: { top: "bottom", right: "right" } }}
                label={<Text>{props.name}</Text>}
                pad='0px'
                elevation='none'
                items={[
                    { icon: <Box pad="10px"><UserSettings/></Box> ,label:  <Box pad="10px" alignSelf="center">Настройки</Box>, href:'/settings', onClick: () => {} },
                    { icon: <Box pad="10px"><Logout/></Box>, label: <Box pad="10px" alignSelf="center">Выйти</Box>, onClick: props.logout }
                ]}
            />
        </Box>
    );
}