import React, { Component } from 'react';
import { Box } from 'grommet';
import styles from './ImageUpload.module.css';
import {Camera} from 'grommet-icons';
import { remote_url } from '../../helpers';



export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.img
        }
    }

    readFile(file) {
        let fileReader = new FileReader();

        return new Promise((resolve, reject) => {
                fileReader.onload = e => {
                        let dataURI = e.target.result;
                        resolve(dataURI);
                }
                fileReader.onerror = () => reject('Ошибка чтения файла');
                fileReader.readAsDataURL(file); 
        })
    }; 

    fileUpload(event) {
        return new Promise((resolve, reject) => {
            event.preventDefault();
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            let extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
                this.readFile(file).then( function(result) {
                    resolve(result); 
                });
            }
            else {
                resolve(file.name);
            }
        })
    };

    handleImageUpload(event) {
        this.fileUpload(event).then((result) => { 
            this.setState({ image: result });
            this.props.returnImage(result);
        });
    }


    render() {
        return (
            <Box direction='row' width='auto' align='center'>
                <input type='file' id='userAvatar' name='userAvatar' className={styles.input} onChange={(event) => this.handleImageUpload(event)}></input>
                <label htmlFor="userAvatar">
                    <Box margin='20px' align='center' className={styles.avatar_container}>
                        <Camera className={styles.camera} color='brand' size='100px'></Camera>
                        <img
                            alt='Avatar'
                            src={this.state.image}
                            className={this.props.shape ? styles.avatar_square : styles.avatar }
                            onError={()=>{this.setState({image: remote_url.images.user_default})}}
                        />
                    </Box>
                </label>
            </Box>
        );
    }
}