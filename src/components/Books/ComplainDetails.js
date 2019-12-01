import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Select, TextArea } from 'grommet';
import {userComplainReasons, bookComplainReasons, userComplainReasonsArray, bookComplainReasonsArray} from './../../helpers'
import styles from './Book.module.css';


class ComplainDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reasons: this.props.type === 'user' ? userComplainReasons : bookComplainReasons,
            arrayReasons: this.props.type === 'user' ? userComplainReasonsArray : bookComplainReasonsArray,
            id: this.props.id, 
            content_code: -1,
            content: 'Причина',
            comment: ''
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit() {
        let complaint = {
            id: this.props.id, 
            content: -1,
            comment: ''
        };

        if (this.state.content_code !== -1) complaint['content'] = this.state.content_code;
        if (this.state.comment !== '') complaint['comment'] = this.state.comment;

        this.props.complain(complaint);
        this.props.onClose();
    }

    setValue(content) {
        this.setState({content_code: this.state.reasons[content]});
        this.setState({content: content});
    }

    render() {
        return (
            <Box gap='small' width='medium' align='center' fill pad='10px'>
                <Box pad='10px' className={styles.scroll_container}>
                    <Box className={styles.scroll_page}>
                        <Heading level={3} margin='none'>
                            Пожаловаться
                        </Heading> 

                        <Box margin={{vertical: '15px'}} fill='horizontal'>
                            <Select options={this.state.arrayReasons} 
                                value={this.state.content} 
                                onChange={({ option }) => this.setValue(option)} 
                            />
                        </Box>

                        <Box margin={{vertical: '15px'}} fill='horizontal'>
                            <TextArea
                                placeholder="Комментарий"
                                value={this.state.comment}
                                resize={false}
                                name='comment'
                                onChange={event => this.handleChange(event)}
                            />  
                        </Box>

                        <Box
                            as='footer'
                            gap='small'
                            direction='row'
                            align='center'
                            justify='end'
                            pad={{ top: 'medium', bottom: 'small' }}
                        >
                            <Link to='#'>
                                <Button label={
                                    <Text color='white'>
                                        <strong>Да</strong>
                                    </Text>
                                } primary onClick={event => this.handleSubmit(event)}/>
                            </Link>
                            <Button
                                label='Нет'
                                onClick={this.props.onClose}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default ComplainDetails;