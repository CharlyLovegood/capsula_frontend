import React, { Component } from 'react';
import {
    Box,
} from 'grommet';
import Gallery from '../../components/Gallery/Gallery';
import BookCard from '../../components/Books/BookCard';
import { connect } from 'react-redux';

import { swapActions } from '../../store/actions';
import { swapStatuses } from '../../helpers/constants';

class HistoryPage extends Component {
    componentDidMount(props) {
        this.props.getSwap();
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
        const {swap} = this.props;
        console.log(swap)
        return (
            <Box direction='column' align='center' fill>
                <Box direction='column' margin='5px' width='800px'>
                    {swap.swapsRecieved &&
                    <Box>
                        <Gallery
                            type='request'
                            contentType='swaps'
                            me='reader'
                            object={this.objectCallBack} 
                            objectList={swap.swapsList.owner.filter(function(item){ return ((item.status === swapStatuses.REJECTED )|| (item.status === swapStatuses.RETURNED))})}
                        >
                        </Gallery>
                        <Gallery
                            type='request'
                            me='reader'
                            contentType='swaps'
                            object={this.objectCallBack} 
                            objectList={swap.swapsList.reader.filter(function(item){ return (item.status === swapStatuses.REJECTED || item.status === swapStatuses.RETURNED)})}
                        >
                        </Gallery>
                    </Box>
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
}

export default connect(mapState, actionCreators)(HistoryPage);