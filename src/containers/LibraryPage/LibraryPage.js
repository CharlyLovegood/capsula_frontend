import React, { Component } from 'react';
import { Box } from 'grommet';
import SmartBook from '../../components/Books/SmartBook';
import Gallery from '../../components/Gallery/Gallery';
import { Add } from 'grommet-icons';
import PopUpButton from '../../components/Button/PopUpButton';
import AddNewBook from '../../components/Books/AddNewBook';
import { libraryActions, bookActions } from '../../store/actions';
import { connect } from 'react-redux';
import Book from '../../components/Books/Book';


class LibraryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: Number(this.props.user.id) === Number(this.props.match.params.id)
        }
    }

    componentDidMount() {
        this.getLibrary();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({owner: Number(this.props.user.id) === Number(this.props.match.params.id)});
            this.getLibrary();
        }
    }

    getLibrary() {
        this.props.getLibrary(this.props.match.params.id);
    }

    render() {
        const {library} = this.props;

        return (
            <Box direction='column' align='center' width='xxlarge'>
                {library.userLibraryRecieved && this.state.owner &&
                    <Gallery 
                        object={(title, coverage, genre, author, id, idAbstract) => <SmartBook handleEditBook={this.props.editBook} handleDeleteBook={this.props.deleteBook} margin='10px' author={author} genre={genre} title={title} coverage={coverage} key={id} id={id} idAbstract={idAbstract}></SmartBook>} 
                        objectList={library.userLibrary}
                        // header='Мои книги'
                        contentType='smart-books'
                    ></Gallery>
                }
                {library.userLibraryRecieved && !this.state.owner &&
                    <Gallery 
                        object={(title, coverage, genre, author, id, idAbstract) => <Book handleDeleteBook={this.props.deleteBook} margin='10px' author={author} genre={genre} title={title} coverage={coverage} key={id} id={idAbstract}></Book>} 
                        objectList={library.userLibrary}
                        // header='Книги'
                        contentType='books'
                    ></Gallery>
                }
                <Box margin='20px'>
                    {this.state.owner &&
                        <PopUpButton forceUpdate={() => this.getLibrary(this.props.user.id)} 
                            innerObject={(onclose, forceUpdate) => <AddNewBook handleAddNewBook={(book) => this.props.addBook(book)} onClose={onclose} forceUpdate={forceUpdate}></AddNewBook>} 
                            label='Добавить книгу' 
                            primary
                            icon={<Add></Add>}>
                        </PopUpButton>
                    }
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
    editBook: bookActions.editBook,
    addBook: bookActions.addBook
}

export default connect(mapState, actionCreators)(LibraryPage);