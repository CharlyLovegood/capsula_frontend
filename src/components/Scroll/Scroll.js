import React, { Component } from 'react';
import styles from './Scroll.module.css';

import { Box } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

import SizeComponent from '../SizeComponent/SizeComponent';
import { Link } from 'react-router-dom';



class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            viewObjectsList: [], 
            len: Math.ceil(this.props.objectList.length/4)*4, 
            currentNum: 0, 
            showArrows: false,
            inRow: 4
        };
    }

    calculateWidth(size) {
        if (size >= 800) return 'xlarge'
        else if (size >= 612) return '612px'
        else if (size >= 424) return '424px'
        else if (size >= 236) return '236px'
        else return 'xlarge'
    }

    calculateNum(size) {
        let inRow = 0;
        if (size >= 800) {
            inRow = 4;
        }
        else if (size >= 612) {
            inRow = 3;
        }
        else if (size >= 424) {
            inRow =  2;
        }
        else {
            inRow =  1;
        }

        if (inRow !== this.state.inRow) {
            this.setState({inRow: inRow});
            this.setState({len: Math.ceil(this.props.objectList.length/inRow)*inRow})
        }
        return inRow;
    }


    componentDidMount() {
        const {inRow, len} = this.state;

        if (len > inRow) {
            this.setState({showArrows: true});
        }

        this.setState({viewObjectsList: this.props.objectList.slice(0, inRow)});
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
                <Box margin={{vertical: '20px'}} direction='column' align='center' width={this.calculateWidth(size)}>
                    <Link className={styles.header} to={`/user/${this.props.id}/library/`}>
                        {this.props.header}
                    </Link>
                    <Box fill
                        direction='row' 
                        justify='between' 
                        align='center'
                        width={this.calculateWidth(size)}
                    >
                        <FormPrevious size='24px' color='contrast' 
                            onClick={() => this.onArrowClick('back')} 
                            className={this.state.showArrows ? styles.arrow : styles.arrow_hidden}>
                        </FormPrevious>

                        <Box flex='grow' direction='row' justify='start'>
                            {this.state.viewObjectsList.slice(0, this.calculateNum(size)).map((element) => {
                                return(this.props.object(element.book.title, element.image, element.book.id))
                            })}
                        </Box>

                        <FormNext size='24px' color='contrast' 
                            onClick={() => this.onArrowClick('forward')} 
                            className={this.state.showArrows ? styles.arrow : styles.arrow_hidden}>
                        </FormNext>
                    </Box>
                </Box>
                )}
            </SizeComponent>
        )
    }
}

export default Scroll;