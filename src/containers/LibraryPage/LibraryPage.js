import React, { Component } from 'react';
import { Box } from 'grommet';
import SmartBook from '../../components/Books/SmartBook';
import Gallery from '../../components/Gallery/Gallery';
import { Add } from 'grommet-icons';
import PopUpButton from '../../components/Button/PopUpButton';
import AddNewBook from '../../components/Books/AddNewBook';
import { libraryActions } from '../../store/actions';
import { connect } from 'react-redux';


class LibraryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: {
                type: '',
                isLoaded: false,
                error: null
            } 
        }
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }
    componentDidMount() {
        this.props.getLibrary();
    }

    getLibrary() {
        this.props.getLibrary();
    }

    handleDeleteBook(id) {
        console.log(id);
        this.props.deleteBook(id);
    }

    render() {
        const {library} = this.props;

        return (
            <Box direction='column' align='center' width='800px'>
                {library.userLibraryRecieved && 
                    <Gallery 
                        object={(title, coverage, id, idAbstract) => <SmartBook handleDeleteBook={this.handleDeleteBook} margin='10px' title={title} coverage={coverage} key={id} id={id} idAbstract={idAbstract}></SmartBook>} 
                        objectList={library.userLibrary}
                        header='My Books'
                        contentType='books'
                    ></Gallery>}
                <Box margin='20px'>
                    <PopUpButton forceUpdate={() => this.getLibrary()} innerObject={(onclose, forceUpdate) => <AddNewBook onClose={onclose} forceUpdate={forceUpdate}></AddNewBook>} label='Add Book' icon={<Add></Add>}></PopUpButton>
                </Box>
            </Box>
        )
    }
}
const mapState = state => ({
    alert: state.alert,
    library: state.library
})

const actionCreators = {
    getLibrary: libraryActions.getBookListById,
    deleteBook: libraryActions.deleteBookById
}

export default connect(mapState, actionCreators)(LibraryPage);