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
            swapsList: undefined
        };
    }

    componentDidMount(props) {
        this.setState({index: this.props.index});
        this.props.getSwap();
    }

    componentDidUpdate() {
        if (!this.state.swapsList && this.props.swap.swapsRecieved) {
            this.setState({ swapsList: this.props.swap.swapsList});
        }
    }
    
    handleReject(id) {
        this.props.changeSwapStatus(id, swapStatuses.REJECTED);
    }

    handleCancel(id) {
        this.props.changeSwapStatus(id, swapStatuses.CANCELED);
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

    objectCallBack = (authors, book, date, genre, id, image, reader, owner, status, type) => {
        return (
            <BookCard handleReject={id => this.handleReject(id)}
                handleAccept={id => this.handleAccept(id)}
                handleBookDelivered={id => this.handleBookDelivered(id)}
                handleFinishSwap={id => this.handleFinishSwap(id)}        
                handleCancel={id => this.handleCancel(id)}        
                margin='10px' 
                book={book} 
                key={id}
                authors={authors}
                date={date}
                reader={reader}
                coverage={image}
                id={id}
                owner={owner}
                status={status}
                type={type}></BookCard>
        )
    }

    
    render() {
        const onActive = nextIndex => this.setState({index: nextIndex});
        const swapsList = this.state.swapsList;

        return (
            <Box direction='column' align='center' fill>
                <Box direction='column' width='xxlarge' align='center'>

                    {swapsList && this.props.match.path === '/reader' &&
                        <Tabs activeIndex={this.state.index} onActive={onActive}>
                            <Tab title='Заявки' >
                                <Gallery
                                    message='Здесь пусто, подайте заявку на книгу'
                                    contentType='swaps'
                                    type='request'
                                    me='reader'
                                    object={this.objectCallBack} 
                                    objectList={swapsList.reader.filter(function(item){ return item.status === swapStatuses.CONSIDERED})}
                                >
                                </Gallery>
                            </Tab>
                            <Tab title='Ждут передачи'>
                                <Gallery
                                    message='Нет активных передач'
                                    contentType='swaps'
                                    me='reader'
                                    type='inProcess'
                                    object={this.objectCallBack} 
                                    objectList={swapsList.reader.filter(function(item){ return item.status === swapStatuses.ACCEPTED})}
                                >
                                </Gallery>
                            </Tab>
                            <Tab title='На руках'>
                                <Gallery
                                    message='У вас на руках нет чужих книг'
                                    contentType='swaps'
                                    me='reader'
                                    type='onHands'
                                    object={this.objectCallBack}
                                    objectList={swapsList.reader.filter(function(item){ return item.status === swapStatuses.READING})}
                                >
                                </Gallery>
                            </Tab>
                        </Tabs>
                    }
                    {swapsList && this.props.match.path === '/owner' &&
                        <Tabs activeIndex={this.state.index} onActive={onActive} >
                            <Tab title='Заявки' >
                                <Gallery
                                    message='Вам пока не отправили заявку на книгу'
                                    contentType='swaps'
                                    me='owner'
                                    type='proposal'
                                    object={this.objectCallBack} 
                                    objectList={swapsList.owner.filter(function(item){ return item.status === swapStatuses.CONSIDERED})}
                                >
                                </Gallery>
                            </Tab>
                            <Tab title='Ждут передачи'>
                                <Gallery
                                    message='Нет активных передач'
                                    contentType='swaps'
                                    me='owner'
                                    type='inProcess'
                                    object={this.objectCallBack}
                                    objectList={swapsList.owner.filter(function(item){ return item.status === swapStatuses.ACCEPTED})}
                                >
                                </Gallery>
                            </Tab>
                            <Tab title='На руках'>
                                <Gallery
                                    message='Все ваши книги у вас'
                                    contentType='swaps'
                                    me='owner'
                                    type='onHands'
                                    object={this.objectCallBack} 
                                    objectList={swapsList.owner.filter(function(item){ return item.status === swapStatuses.READING})}
                                >
                                </Gallery>
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


const connectedSwapPage = connect(mapState, actionCreators)(SwapPage);

export { connectedSwapPage as SwapPage };