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

    objectCallBack = (authors, book, date, genre, id, image, reader, owner, status, type) => {
        return (
            <BookCard       
                margin='10px' 
                book={book} 
                key={id}
                authors={authors}
                date={date}
                user={reader || owner}
                coverage={image}
                id={id}
                type={type}
                history={status}>
            </BookCard>
        )
    }

    render() {
        const {swap} = this.props;
        let list = [];
        if (swap.swapsRecieved) {
            list = (swap.swapsList.owner.filter(function(item){ return ((item.status === swapStatuses.REJECTED )|| (item.status === swapStatuses.RETURNED))})).concat(swap.swapsList.reader.filter(function(item){ return (item.status === swapStatuses.CANCELED || item.status === swapStatuses.REJECTED || item.status === swapStatuses.RETURNED)}));
        }
        return (
            <Box direction='column' align='center' fill>
                <Box direction='column' width='xxlarge'>
                    {swap.swapsRecieved &&
                    <Box align='center'>
                        <Gallery
                            message='Здесь будет отображаться история ваших заявок и обменов'
                            contentType='swaps'
                            me='owner'
                            object={this.objectCallBack} 
                            objectList={list}
                        >
                        </Gallery>
                        {/* <Gallery
                            me='reader'
                            contentType='swaps'
                            object={this.objectCallBack} 
                            objectList={swap.swapsList.reader.filter(function(item){ return (item.status === swapStatuses.REJECTED || item.status === swapStatuses.RETURNED)})}
                        >
                        </Gallery> */}
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

const connectedHistoryPage = connect(mapState, actionCreators)(HistoryPage);

export { connectedHistoryPage as HistoryPage };
