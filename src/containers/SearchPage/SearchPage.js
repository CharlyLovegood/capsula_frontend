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
    state = { value: '', suggestedList: [] };

    boxRef = createRef();
  
    componentDidMount() {
        this.forceUpdate();
    }
  
    onChange = event => this.setState({ value: event.target.value }, () => {
        const { value } = this.state;
        if (!value.trim()) {
            this.setState({ suggestedList: [] });
        } else {
            this.props.request(value);
            if (this.props.search.search) {
                setTimeout(() => this.setState({ suggestedList: this.props.search.search.searchResult.data }), 300);
            }
        }
    });
  
    onSelect = event => this.setState({ value: event.suggestion.value });

    renderSearchResult = () => {
        const { value, suggestedList } = this.state;
            return suggestedList
            .filter(
                ({ title }) => title.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
            .map(({ title }) => (
                <SearchElement name={title}></SearchElement>
            ));
        
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
                            placeholder='Enter your name...'
                        />
                    </Box>
                    <Filter></Filter>
                </Box>
                <Box>
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