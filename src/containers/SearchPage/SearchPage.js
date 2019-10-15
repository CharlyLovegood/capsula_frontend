import React, { createRef, Component } from 'react';
import { Search } from 'grommet-icons';
import { 
    Box, 
    TextInput 
} from 'grommet';
import { connect } from 'react-redux';

import { searchActions } from '../../store/actions';
import SearchElement from '../../components/Search/SearchElement';

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
                setTimeout(() => this.setState({ suggestedList: this.props.search.search.searchResult }), 300);
            }
        }
    });
  
    onSelect = event => this.setState({ value: event.suggestion.value });

    renderSearchResult = () => {
        const { value, suggestedList } = this.state;
            return suggestedList
            .filter(
                ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
            .map(({ name, imageUrl }) => (
                <SearchElement name={name} imageUrl={imageUrl}></SearchElement>
            ));
        
    };
  
    render() {
        const { value } = this.state;

        return (
            <Box direction='column' align='center' width='400px'>
                <Box
                    background='background'
                    ref={this.boxRef}
                    fill
                    direction='row'
                    align='center'
                    pad={{ horizontal: 'small', vertical: 'xsmall' }}
                    margin={{ horizontal: 'small', vertical: 'xsmall' }}
                    round='small'
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