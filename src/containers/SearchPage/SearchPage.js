import React, { createRef, Component } from 'react';
import { Search } from 'grommet-icons';
import { 
    Box, 
    TextInput
} from 'grommet';
import { connect } from 'react-redux';

import { searchActions } from '../../store/actions';
// import SearchElement from '../../components/Search/SearchElement';
import Filter from '../../components/Filter/Filter';
import Book from '../../components/Books/Book';
import Gallery from '../../components/Gallery/Gallery';


class SearchPage extends Component {
    state = { value: '', suggestedList: [], genre: '' };

    boxRef = createRef();
  
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.request();
        this.forceUpdate();
    }

    componentDidUpdate(prevProps) {
        if ( this.props.search !== prevProps.search && this.props.search.found === true) {
            this.setState({ suggestedList: this.props.search.search.searchResult.data });
        }
    }
  
    onChange = event => this.setState({ value: event.target.value }, () => {
        const { value } = this.state;
        if (!value.trim()) {
            this.setState({ suggestedList: [] });
        } else {
            if (this.props.search.search) {
                this.setState({ suggestedList: this.props.search.search.searchResult.data });
            }
        }
    });

    onSelect = event => this.setState({ value: event.suggestion.value });

    renderSearchResult = () => {
        // const { value, suggestedList } = this.state;
        // const res = suggestedList.filter((el) => {
        //     if (this.state.genre !== ''){
        //         return  (el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0 && el.book.genre === this.state.genre)
        //     } else {
        //         return  (el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0)

        //     }
        // })
        // .map((el) => (
        //     <SearchElement id={el.book.id} key={el.book.id} name={el.book.title} image={el.image} author={el.book.authors}></SearchElement>
        // ));


        // if (res.length === 0 && value !== '') {
        //     return [<SearchElement id={'no res'} key={'no res'} name={'Ничего не найдено :('}></SearchElement>]
        // } else {
        //     return res;
        // }
        const { value, suggestedList } = this.state;

        const res = suggestedList.filter((el) => {
            if (this.state.genre !== ''){
                return  (el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0 && el.book.genre === this.state.genre)
            } else {
                return  (el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0)

            }
        })

        return(
        <Gallery 
            object={(title, coverage, genre, author, id, idAbstract) => <Book handleDeleteBook={this.props.deleteBook} margin='10px' author={author} genre={genre} title={title} coverage={coverage} key={idAbstract} id={idAbstract}></Book>} 
            objectList={res}
            contentType='books'
        ></Gallery>)
    };
  
    render() {
        const { value } = this.state;

        return (
            <Box direction='column' align='center' width='xxlarge'>
                <Box fill direction='row' align='center' wrap>
                    <Box
                        background='background'
                        ref={this.boxRef}
                        direction='row'
                        align='center'
                        flex='grow'
                        height='55px'
                        pad={{ horizontal: 'small', vertical: 'xsmall' }}
                        margin={{ horizontal: 'small', vertical: 'xsmall' }}
                        round='8px'
                        border={{
                            side: 'all',
                            color: 'border'
                        }}
                    >
                        <Search color='brand' />
                        <TextInput
                            type='search'
                            dropTarget={this.boxRef.current}
                            plain
                            value={value}
                            onChange={this.onChange}
                            onSelect={this.onSelect}
                            placeholder='Найти книгу...'
                        />
                    </Box>
                    <Box width='400px' margin={{ horizontal: 'small', vertical: 'xsmall' }}>
                        <Filter  updateGenre={(genre) => this.setState({genre: genre})}></Filter>
                    </Box>
                </Box>
                <Box justify='center' direction='row' wrap fill>
                    {this.renderSearchResult()}
                </Box>
            </Box>
        );
    }
}

const mapState = state => ({
    search: state.search
})

const actionCreators = {
    request: searchActions.request
}

const connectedSearchPage = connect(mapState, actionCreators)(SearchPage);

export { connectedSearchPage as SearchPage };