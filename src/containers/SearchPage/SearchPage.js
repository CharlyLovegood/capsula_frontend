import React, { createRef, Component } from 'react';
import { Search } from 'grommet-icons';
import { 
    Box, 
    TextInput
} from 'grommet';
import { connect } from 'react-redux';

import { searchActions } from '../../store/actions';
import SearchElement from '../../components/Search/SearchElement';
import Filter from '../../components/Filter/Filter';


class SearchPage extends Component {
    state = { value: '', suggestedList: [], genre: '' };

    boxRef = createRef();
  
    componentDidMount() {
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
        const { value, suggestedList } = this.state;
        const res = suggestedList.filter((el) => {
            if (this.state.genre !== ''){
                return  (el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0 && el.book.genre === this.state.genre)
            } else {
                return  (el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0)

            }
        })
        .map((el) => (
            <SearchElement id={el.book.id} key={el.book.id} name={el.book.title} image={el.image} author={el.book.authors}></SearchElement>
        ));
        if (res.length === 0 && value !== '') {
            return [<SearchElement id={'no res'} key={'no res'} name={'Ничего не найдено :('}></SearchElement>]
        } else {
            return res;
        }
        
    };
  
    render() {
        const { value } = this.state;

        return (
            <Box direction='column' align='center' width='720px'>
                <Box fill direction='row' align='center'>
                    <Box
                        background='background'
                        ref={this.boxRef}
                        direction='row'
                        align='center'
                        fill
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
                    <Filter updateGenre={(genre) => this.setState({genre: genre})}></Filter>
                </Box>
                <Box fill>
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