import React, { Component } from 'react';
import { Box } from 'grommet';
import Book from '../Books/Book';
import Gallery from '../Gallery/Gallery';
import { Add } from 'grommet-icons';
import PopUpButton from '../Button/PopUpButton';
import AddNewBook from './AddNewBook';


class BookGalleryPage extends Component {
    state = { viewObjectsList: [] };

    componentDidMount() {
        this.setState({ viewObjectsList: [
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 1 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 2 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 3 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 },
            {title: '', coverage: 'https://i.pinimg.com/564x/cc/49/d1/cc49d1e66adac0c68d2458dbf052beec.jpg', id: 4 }
        ] })
    }

    handleAddBook() {
        console.log('add book');
    }

    render() {
        return (
            <Box direction='column' align='center' width='800px'>
                <Gallery 
                    object={(title, coverage, id) => <Book margin='10px' title={title} coverage={coverage} key={id}></Book>} 
                    objectList={this.state.viewObjectsList} 
                    header='My Books'
                ></Gallery>
                <PopUpButton innerObject={onclose => <AddNewBook onClose={onclose}></AddNewBook>} label='Add Book' icon={<Add></Add>}></PopUpButton>
            </Box>
        )
    }
}

export default BookGalleryPage;