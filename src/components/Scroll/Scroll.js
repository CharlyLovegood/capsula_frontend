import React, { Component } from 'react';
import styles from './Scroll.module.css';

import { Box, ResponsiveContext } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

import { remote_url } from './../../helpers';
import SizeComponent from '../SizeComponent/SizeComponent';
import { Link } from 'react-router-dom';

class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            viewObjectsList: [], 
            len: this.props.objectList.length, 
            currentNum: 0, 
            showArrows: false,
        };
    }

    calculateNum(size) {
        if (size >= 720) return 4
        else if (size >= 540) return 3
        else return 2
    }

    componentDidMount() {
        if (this.state.len !== 0) {
            const rem = this.state.len % 4;
            if (rem !== 0) {
                let i;
                for (i = 0; i < 4 - rem; i++) {
                    this.props.objectList.push({book: {title: "", authors: "", genre: 3, id: i*(-35)},
                    id: i*(-45),
                    image: remote_url.images.scroll_additional_book,
                    status: 0})
                }
            }
        }

        if (this.state.len > 4) {
            this.setState({showArrows: true});
        }

        this.setState({viewObjectsList: this.props.objectList.slice(0,4)});
        this.setState({len: this.props.objectList.length});
    }



    onArrowClick = (direction) => {
        let begin = 0;
        if (direction === 'forward') {
            this.setState({currentNum: begin});
            begin = (this.state.currentNum + 4) % this.state.len;
            this.setState({viewObjectsList: this.props.objectList.slice(begin, begin + 4)});
        } else {
            if (this.state.currentNum - 4 < 0) {
                begin = this.state.len + (this.state.currentNum - 4);
            } else {
                begin = this.state.currentNum - 4;
            }
            this.setState({viewObjectsList: this.props.objectList.slice(begin, begin + 4)});
        }
        this.setState({currentNum: begin});
    }


    render() {
        return ( 
            <SizeComponent>
                {size => (
                <Box direction='column' align='center' className={styles.scroll_container}>
                    <Link className={styles.header} to={`/user/${this.props.id}/library/`}>
                        {this.props.header}
                    </Link>
                    <Box direction='column' align='center'>
                        <Box 
                            flex 
                            pad='10px' 
                            direction='row' 
                            justify='around' 
                            gap='small' 
                            align='center'
                            >
                            <FormPrevious color='contrast' 
                                onClick={() => this.onArrowClick('back')} 
                                className={this.state.showArrows ? styles.arrow : styles.arrow_hidden}>
                            </FormPrevious>

                            {this.state.viewObjectsList.slice(0, this.calculateNum(size)).map((element) => {
                                return(this.props.object(element.book.title, element.image, element.book.id))
                            })}

                            <FormNext color='contrast' 
                                onClick={() => this.onArrowClick('forward')} 
                                className={this.state.showArrows ? styles.arrow : styles.arrow_hidden}>
                            </FormNext>
                        </Box>
                    </Box>
                </Box>
                )}
            </SizeComponent>
        )
    }
}

export default Scroll;