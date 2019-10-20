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
            action: {
                type: '',
                isLoaded: false,
                error: null
            }
        };
    }

    componentDidMount(props) {
        this.setState({index: this.props.index});
        this.props.getSwapRequests();
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
        const {swap} = this.props;
        return (
            <Box direction='column' align='center' fill>
                <Box direction='row' margin='5px' width='800px'>
                    {swap.requestsRecieved &&
                    <Tabs>
                        <Tab title='I am reading'>
                            <Tabs activeIndex={this.state.index} onActive={onActive} margin='20px'>
                                <Tab title='Requests' >
                                    <Gallery
                                        me='reader'
                                        object={(authors, book, date, genre, id, image, reader, status) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                                            margin='10px' 
                                                                                            title={book} 
                                                                                            key={id}
                                                                                            authors={authors}
                                                                                            date={date}
                                                                                            user={reader}
                                                                                            coverage={image}
                                                                                            type='proposal'></BookCard>} 
                                        objectList={swap.requestsList.reader.filter(function(item){ return item.status === swapStatuses.CONSIDERED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='In process'>
                                    <Gallery
                                        me='reader'
                                        object={(authors, book, date, genre, id, image, reader, status) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                        handleRejectProposal={event => this.handleRejectProposal(event)} 
                                                                        margin='10px' 
                                                                        title={book} 
                                                                        key={id}
                                                                        authors={authors}
                                                                        date={date}
                                                                        coverage={image}
                                                                        user={reader}
                                                                        type='proposal'></BookCard>} 
                                        objectList={swap.requestsList.reader.filter(function(item){ return item.status === swapStatuses.ACCEPTED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='On hands'>
                                    <Gallery
                                        me='reader'
                                        object={(authors, book, date, genre, id, image, reader, status) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                        handleRejectProposal={event => this.handleRejectProposal(event)} 
                                                                        margin='10px' 
                                                                        title={book} 
                                                                        key={id}
                                                                        authors={authors}
                                                                        date={date}
                                                                        coverage={image}
                                                                        user={reader}
                                                                        type='proposal'></BookCard>} 
                                        objectList={swap.requestsList.reader.filter(function(item){ return item.status === swapStatuses.READING})}
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
                                        object={(authors, book, date, genre, id, image, owner, status) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                                            margin='10px' 
                                                                                            title={book} 
                                                                                            key={id}
                                                                                            authors={authors}
                                                                                            date={date}
                                                                                            coverage={image}
                                                                                            user={owner}
                                                                                            type='proposal'></BookCard>} 
                                        objectList={swap.requestsList.owner.filter(function(item){ return item.status === swapStatuses.CONSIDERED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='In process'>
                                    <Gallery
                                        me='owner'
                                        object={(authors, book, date, genre, id, image, owner, status) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                        handleRejectProposal={event => this.handleRejectProposal(event)} 
                                                                        margin='10px' 
                                                                        title={book} 
                                                                        key={id}
                                                                        authors={authors}
                                                                        coverage={image}
                                                                        date={date}
                                                                        user={owner}
                                                                        type='proposal'></BookCard>} 
                                        objectList={swap.requestsList.owner.filter(function(item){ return item.status === swapStatuses.ACCEPTED})}
                                    >
                                    </Gallery>
                                </Tab>
                                <Tab title='On hands'>
                                    <Gallery
                                        me='owner'
                                        object={(authors, book, date, genre, id, image, owner, status) => <BookCard handleAcceptProposal={event => this.handleAcceptProposal(event)} 
                                                                        handleRejectProposal={event => this.handleRejectProposal(event)} 
                                                                        margin='10px' 
                                                                        title={book} 
                                                                        key={id}
                                                                        authors={authors}
                                                                        coverage={image}
                                                                        date={date}
                                                                        user={owner}
                                                                        type='proposal'></BookCard>} 
                                        objectList={swap.requestsList.owner.filter(function(item){ return item.status === swapStatuses.READING})}
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
    getSwapRequests: swapActions.getSwapRequests,
    getSwapProposals: swapActions.getSwapProposals,
    getInProcessSwaps: swapActions.getInProcessSwaps,
    getOnHandsSwaps: swapActions.getOnHandsSwaps
}

export default connect(mapState, actionCreators)(SwapPage);