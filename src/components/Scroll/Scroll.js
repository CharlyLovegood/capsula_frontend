import React, { Component } from 'react';
import styles from './Scroll.module.css';

import { Box } from 'grommet';
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
            inRow: 4
        };
    }

    calculateWidth(size) {
        if (size >= 800) return 'xlarge'
        else if (size >= 600) return '600px'
        else if (size >= 400) return '400px'
        else if (size >= 200) return 'small'
        else return 'xlarge'
    }

    calculateNum(size) {
        let inRow = 0;
        if (size >= 800) {
            inRow = 4;
        }
        else if (size >= 600) {
            inRow = 3;
        }
        else if (size >= 400) {
            inRow =  2;
        }
        else {
            inRow =  1;
        }

        if (inRow !== this.state.inRow) {
            this.setState({inRow: inRow});
        }
        return inRow;
    }


    componentDidMount() {
        const {inRow, len} = this.state;
        if (len !== 0) {
            const rem = len % inRow;
            if (rem !== 0) {
                let i;
                for (i = 0; i < inRow - rem; i++) {
                    this.props.objectList.push({book: {title: "", authors: "", genre: 3, id: i*(-35)},
                    id: i*(-45),
                    image: remote_url.images.scroll_additional_book,
                    status: 0})
                }
            }
        }

        if (len > inRow) {
            this.setState({showArrows: true});
        }

        this.setState({viewObjectsList: this.props.objectList.slice(0, inRow)});
        this.setState({len: this.props.objectList.length});
    }



    onArrowClick = (direction) => {
        const {inRow, len, currentNum} = this.state;
        let begin = 0;
        if (direction === 'forward') {
            this.setState({currentNum: begin});
            begin = (currentNum + inRow) % len;
            this.setState({viewObjectsList: this.props.objectList.slice(begin, begin + inRow)});
        } else {
            if (currentNum - inRow < 0) {
                begin = len + (currentNum - inRow);
            } else {
                begin = currentNum - inRow;
            }
            this.setState({viewObjectsList: this.props.objectList.slice(begin, begin + inRow)});
        }
        this.setState({currentNum: begin});
    }


    render() {
        return ( 
            <SizeComponent>
                {size => (
                <Box direction='column' align='center' width='xlarge'>
                    <Link className={styles.header} to={`/user/${this.props.id}/library/`}>
                        {this.props.header}
                    </Link>
                    <Box direction='column' align='center'>
                        <Box 
                            flex 
                            direction='row' 
                            justify='around' 
                            align='center'
                            width={this.calculateWidth(size)}
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