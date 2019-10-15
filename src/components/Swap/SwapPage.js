import React, { Component } from 'react';
import {
    Box,
    Tab,
    Tabs
} from 'grommet';
import Gallery from '../Gallery/Gallery';
import BookCard from '../Books/BookCard';


class SwapPage extends Component {
    state = { index: 0, viewObjectsList: [] };

    componentDidMount(props) {
        this.setState({index: this.props.index});
        this.setState({ viewObjectsList: [
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 1 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 2 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 3 }
        ] });
    }

    render() {
        const onActive = nextIndex => this.setState({index: nextIndex});

        return (
            <Box direction='column' align='center' fill>
                <Box direction='row' margin='5px' width='800px' align='center'>
                    <Tabs activeIndex={this.state.index} onActive={onActive} margin='20px'>
                        <Tab title='Proposals' >
                            <Gallery
                                object={(title, coverage, id) => <BookCard margin='10px' title={title} coverage={coverage} key={id}></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                        <Tab title='Requests' >
                            <Gallery
                                object={(title, coverage, id) => <BookCard margin='10px' title={title} coverage={coverage} key={id}></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                        <Tab title='In process'>
                            <Gallery
                                object={(title, coverage, id) => <BookCard margin='10px' title={title} coverage={coverage} key={id}></BookCard>} 
                                objectList={this.state.viewObjectsList}
                            >
                            </Gallery>
                        </Tab>
                        <Tab title='On hands'>
                            <Gallery
                                object={(title, coverage, id) => <BookCard margin='10px' title={title} coverage={coverage} key={id}></BookCard>} 
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

export default SwapPage;