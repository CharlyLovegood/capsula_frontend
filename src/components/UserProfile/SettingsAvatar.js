import React from 'react';
import { Box } from 'grommet';
import styles from './UserProfile.module.css';
import {Camera} from 'grommet-icons';

export default function UserAvatar(props) {
    return (
        <Box direction='row' width='auto' align='center'>
            <input type='file' id='userAvatar' name='userAvatar' className={styles.input} onChange={props.handleImageUpload}></input>
            <label htmlFor="userAvatar">
                <Box margin='20px' align='center' className={styles.big_avatar_container}>
                    <Camera className={styles.camera} color='brand' size='100px'></Camera>
                    <img
                        alt='Avatar'
                        src={props.img}
                        className={styles.big_avatar}
                    />
                </Box>
            </label>
        </Box>
    );
}