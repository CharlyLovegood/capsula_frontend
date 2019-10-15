import React, { Component } from 'react';
import { Box } from 'grommet';
import Book from '../../components/Books/Book';
import Gallery from '../../components/Gallery/Gallery';
import { Add } from 'grommet-icons';
import PopUpButton from '../../components/Button/PopUpButton';
import AddNewBook from '../../components/Books/AddNewBook';
import { libraryActions } from '../../store/actions';
import { connect } from 'react-redux';


class LibraryPage extends Component {
    componentDidMount() {
        this.props.getLibrary()
    }

    render() {
        return (
            <Box direction='column' align='center' width='800px'>
                <Gallery 
                    object={(title, coverage, id) => <Book margin='10px' title={title} coverage={coverage} key={id} id={id}></Book>} 
                    objectList={this.props.library.userLibrary ? this.props.library.userLibrary.data : []} 
                    header='My Books'
                    contentType='books'
                ></Gallery>
                <PopUpButton innerObject={onclose => <AddNewBook onClose={onclose}></AddNewBook>} label='Add Book' icon={<Add></Add>}></PopUpButton>
            </Box>
        )
    }
}
const mapState = state => ({
    alert: state.alert,
    library: state.library
})

const actionCreators = {
    getLibrary: libraryActions.getBookListById
}

export default connect(mapState, actionCreators)(LibraryPage);