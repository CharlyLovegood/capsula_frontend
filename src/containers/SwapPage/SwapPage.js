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

class SwapPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            index: 0, 
            viewObjectsList: [],
            action: {
                type: '',
                isLoaded: false,
                error: null
            }
        };
    }

    componentDidMount(props) {
        this.setState({index: this.props.index});
        this.setState({ viewObjectsList: [
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 1 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 2 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 3 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 }
        ] });
    }
    
    handleRejectProposal(bookId) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(bookId)
        };
    
        return fetch('http://localhost:8000/', requestOptions)
            .then(
                response => {
                    this.setState({action:{
                        type: 'RejectProposal',
                        isLoaded: true,
                        error: null
                    }})
                    return response;
                },
                error => {
                    this.setState({action:{
                        type: 'RejectProposal',
                        isLoaded: false,
                        error: error
                    }})
                });
    }

    handleAcceptProposal(bookId) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(bookId)
        };
    
        return fetch('http://localhost:8000/', requestOptions)
            .then(
                response => {
                    this.setState({action:{
                        type: 'AcceptProposal',
                        isLoaded: true,
                        error: null
                    }})
                    return response;
                },
                error => {
                    this.setState({action:{
                        type: 'AcceptProposal',
                        isLoaded: false,
                        error: error
                    }})
                });
    }

    handleCancelRequest(bookId) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(bookId)
        };
    
        return fetch('http://localhost:8000/', requestOptions)
            .then(
                response => {
                    this.setState({action:{
                        type: 'CancelRequest',
                        isLoaded: true,
                        error: null
                    }})
                    return response;
                },
                error => {
                    this.setState({action:{
                        type: 'CancelRequest',
                        isLoaded: false,
                        error: error
                    }})
                });
    }

    handleBookDelivered(bookId) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(bookId)
        };
    
        return fetch('http://localhost:8000/', requestOptions)
            .then(
                response => {
                    this.setState({action:{
                        type: 'BookDelivered',
                        isLoaded: true,
                        error: null
                    }})
                    return response;
                },
                error => {
                    this.setState({action:{
                        type: 'BookDelivered',
                        isLoaded: false,
                        error: error
                    }})
                });
    }
    
    handleFinishSwap(bookId) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(bookId)
        };
    
        return fetch('http://localhost:8000/', requestOptions)
            .then(
                response => {
                    this.setState({action:{
                        type: 'FinishSwap',
                        isLoaded: true,
                        error: null
                    }})
                    return response;
                },
                error => {
                    this.setState({action:{
                        type: 'FinishSwap',
                        isLoaded: false,
                        error: error
                    }})
                });
    }


    render() {
        const onActive = nextIndex => this.setState({index: nextIndex});

        return (
            <Box direction='column' align='center' fill>
                <Box direction='row' margin='5px' width='800px'>
                    <Tabs activeIndex={this.state.index} onActive={onActive} margin='20px'>
                        <Tab title='Proposals' >
                            <Gallery
                                object={(title, coverage, id) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                            handleRejectProposal={event => this.handleRejectProposal(event)} 
                                                                            margin='10px' 
                                                                            title={title} 
                                                                            coverage={coverage} 
                                                                            key={id}
                                                                            type='proposal'></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                        <Tab title='Requests' >
                            <Gallery
                                object={(title, coverage, id) => <BookCard handleCancelRequest={event => this.handleCancelRequest(event)} 
                                                                            margin='10px' 
                                                                            title={title} 
                                                                            coverage={coverage} 
                                                                            key={id}
                                                                            type='request'></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                        <Tab title='In process'>
                            <Gallery
                                object={(title, coverage, id) => <BookCard handleBookDelivered={event => this.handleBookDelivered(event)} 
                                                                            margin='10px' 
                                                                            title={title} 
                                                                            coverage={coverage} 
                                                                            key={id}
                                                                            type='inProcess'></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                        <Tab title='On hands'>
                            <Gallery
                                object={(title, coverage, id) => <BookCard handleFinishSwap={event => this.handleFinishSwap(event)} 
                                                                            margin='10px' 
                                                                            title={title} 
                                                                            coverage={coverage} 
                                                                            key={id}
                                                                            type='onHands'></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                    </Tabs>
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
    getSwapRequests: swapActions.getSwapRequests,
    getSwapProposals: swapActions.getSwapProposals,
    getInProcessSwaps: swapActions.getInProcessSwaps,
    getOnHandsSwaps: swapActions.getOnHandsSwaps
}

export default connect(mapState, actionCreators)(SwapPage);