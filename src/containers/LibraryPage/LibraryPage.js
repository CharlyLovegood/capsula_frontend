import React, { Component } from 'react';
import { Box } from 'grommet';
import SmartBook from '../../components/Books/SmartBook';
import Gallery from '../../components/Gallery/Gallery';
import { Add } from 'grommet-icons';
import PopUpButton from '../../components/Button/PopUpButton';
import AddNewBook from '../../components/Books/AddNewBook';
import { libraryActions, bookActions } from '../../store/actions';
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
    }
    componentDidMount() {
        this.props.getLibrary(this.props.user.id);
    }

    getLibrary() {
        this.props.getLibrary(this.props.user.id);
    }

    render() {
        const {library} = this.props;

        return (
            <Box direction='column' align='center' width='800px'>
                {library.userLibraryRecieved && 
                    <Gallery 
                        object={(title, coverage, id, idAbstract) => <SmartBook handleDeleteBook={this.props.deleteBook} margin='10px' title={title} coverage={coverage} key={id} id={id} idAbstract={idAbstract}></SmartBook>} 
                        objectList={library.userLibrary}
                        header='My Books'
                        contentType='books'
                    ></Gallery>
                }
                <Box margin='20px'>
                    <PopUpButton forceUpdate={() => this.getLibrary(this.props.user.id)} 
                        innerObject={(onclose, forceUpdate) => <AddNewBook handleAddNewBook={(book) => this.props.addBook(book)} onClose={onclose} forceUpdate={forceUpdate}></AddNewBook>} 
                        label='Add Book' 
                        icon={<Add></Add>}>
                    </PopUpButton>
                </Box>
            </Box>
        )
    }
}
const mapState = state => ({
    user: state.authentication.user,
    alert: state.alert,
    library: state.library,
})

const actionCreators = {
    getLibrary: libraryActions.getBookListById,
    deleteBook: bookActions.deleteBookById,
    addBook: bookActions.addBook
}

export default connect(mapState, actionCreators)(LibraryPage);