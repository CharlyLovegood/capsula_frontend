import React, { Component } from 'react';
import styles from './Scroll.module.css';

import { Box, ResponsiveContext } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = { viewObjectsList: [], len: this.props.objectList.length, currentNum: 0, showArrows: false};
    }

    componentDidMount() {
        if (this.state.len !== 0) {
            const rem = this.state.len % 4;
            if (rem !== 0) {
                let i;
                for (i = 0; i < 4 - rem; i++) {
                    this.props.objectList.push({title: '', coverage: 'https://i.pinimg.com/564x/74/26/f8/7426f8bdf968010ad4daa520c2a1cfd7.jpg', id: 67*i })
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
    }

    render(props) {
        return(
            <Box direction='column' align='center' className={styles.scroll_container}>
                <h3 className={styles.header}>{this.props.header}</h3>
                <Box direction='column' align='center'>
                    <ResponsiveContext.Consumer>
                    {size => 
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
                            {(size !== 'small') ? (
                                this.state.viewObjectsList.slice(0, 4).map(({title, coverage, id}) => {
                                    return(this.props.object(title, coverage, id))
                                })
                            ): (
                                this.state.viewObjectsList.slice(0, 3).map(({title, coverage, id}) => {
                                    return(this.props.object(title, coverage, id))
                                })
                            )}  
                            <FormNext color='contrast' 
                                        onClick={() => this.onArrowClick('forward')} 
                                        className={this.state.showArrows ? styles.arrow : styles.arrow_hidden}>
                            </FormNext>
                        </Box>
                    }
                    </ResponsiveContext.Consumer>
                </Box>
            </Box>
        );
    }
}

export default Scroll;