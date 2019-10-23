import React, { Component } from 'react';
import {
    Box,
    Tab,
    Tabs
} from 'grommet';
import Gallery from '../../components/Gallery/Gallery';
import BookCard from '../../components/Books/BookCard';
import { connect } from 'react-redux';

import { swapActions } from '../../store/actions';
import { swapStatuses } from '../../helpers/constants';

class SwapPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            index: 0, 
            viewObjectsList: [],
        };
    }

    componentDidMount(props) {
        this.setState({index: this.props.index});
        this.props.getSwap();
    }
    
    handleReject(id) {
        this.props.changeSwapStatus(id, swapStatuses.REJECTED);
    }

    handleAccept(id) {
        this.props.changeSwapStatus(id, swapStatuses.ACCEPTED);
    }

    handleBookDelivered(id) {
        this.props.changeSwapStatus(id, swapStatuses.READING);
    }
    
    handleFinishSwap(id) {
        this.props.changeSwapStatus(id, swapStatuses.RETURNED);
    }

    objectCallBack = (authors, book, date, genre, id, image, reader, status, type) => {
        return (
            <BookCard handleReject={id => this.handleReject(id)}
                handleAccept={id => this.handleAccept(id)}
                handleBookDelivered={id => this.handleBookDelivered(id)}
                handleFinishSwap={id => this.handleFinishSwap(id)}        
                margin='10px' 
                title={book} 
                key={id}
                authors={authors}
                date={date}
                user={reader}
                coverage={image}
                id={id}
                type={type}></BookCard>
        )
    }

    render() {
        const onActive = nextIndex => this.setState({index: nextIndex});
        const {swap} = this.props;
        return (
            <Box direction='column' align='center' fill>
                <Box direction='row' margin='5px' width='800px'>
                    {swap.swapsRecieved &&
                    <Tabs>
                        <Tab title='I am reading'>
                            <Tabs activeIndex={this.state.index} onActive={onActive} margin='20px'>
                                <Tab title='Requests' >
                                    <Gallery
                                        type='request'
                                        me='reader'
                                        object={this.objectCallBack} 
                                        objectList={swap.swapsList.reader.filter(function(item){ return item.status === swapStatuses.CONSIDERED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='In process'>
                                    <Gallery
                                        me='reader'
                                        type='inProcess'
                                        object={this.objectCallBack} 
                                        objectList={swap.swapsList.reader.filter(function(item){ return item.status === swapStatuses.ACCEPTED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='On hands'>
                                    <Gallery
                                        me='reader'
                                        
                                        object={this.objectCallBack}
                                        objectList={swap.swapsList.reader.filter(function(item){ return item.status === swapStatuses.READING})}
                                    >
                                    </Gallery>
                                </Tab>
                            </Tabs>
                        </Tab>


                        <Tab title='My books are red'>
                            <Tabs activeIndex={this.state.index} onActive={onActive} margin='20px'>
                                <Tab title='Requests' >
                                    <Gallery
                                        me='owner'
                                        type='proposal'
                                        object={this.objectCallBack} 
                                        objectList={swap.swapsList.owner.filter(function(item){ return item.status === swapStatuses.CONSIDERED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='In process'>
                                    <Gallery
                                        me='owner'
                                        type='inProcess'
                                        object={this.objectCallBack}
                                        objectList={swap.swapsList.owner.filter(function(item){ return item.status === swapStatuses.ACCEPTED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='On hands'>
                                    <Gallery
                                        me='owner'
                                        type='onHands'
                                        object={this.objectCallBack} 
                                        objectList={swap.swapsList.owner.filter(function(item){ return item.status === swapStatuses.READING})}
                                    >
                                    </Gallery>
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                    }
                </Box>
            </Box>
        )
    }
}

const mapState = state => ({
    swap: state.swap,
    alert: state.alert
})

const actionCreators = {
    getSwap: swapActions.getSwap,
    changeSwapStatus: swapActions.changeSwapStatus
}

export default connect(mapState, actionCreators)(SwapPage);