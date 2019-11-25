import React, { Component } from 'react';
import { Box } from 'grommet';
import styles from './ImageUpload.module.css';
import {Camera} from 'grommet-icons';
import { remote_url } from '../../helpers';



export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.img || remote_url.images.user_default,
            initialImg: this.props.img || remote_url.images.user_default
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
            if ( event.target.files[0]) {
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
                    this.setState()
                    reject(file.name);
                }
            } else {
                reject('Нет файла')
            }
        })
    };

    handleImageUpload(event) {
        this.fileUpload(event).then((result) => { 
            this.setState({ image: result });
            this.props.returnImage(result);
        });
    }


    onError() {
        if (this.state.image === this.state.initialImg) {
            this.setState({ image: remote_url.images.user_default });
            this.props.returnImage(remote_url.images.user_default);
        } else {
            this.setState({image: this.state.initialImg})
            this.props.returnImage(this.state.initialImg);
        }
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
                            onError={()=> this.onError()}
                        />
                    </Box>
                </label>
            </Box>
        );
    }
}