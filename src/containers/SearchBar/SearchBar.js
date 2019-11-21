import React, { createRef, Component } from 'react';
import { 
    Box, 
    Text, 
    TextInput
} from 'grommet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './SearchBar.module.css';
import { searchActions } from '../../store/actions';
import SearchElement from '../../components/Search/SearchElement';


class SearchBar extends Component {
    state = { value: '', suggestedList: []};

    boxRef = createRef();
  
    componentDidMount() {
        this.forceUpdate();
        if (!this.props.search.search) {
            this.props.request();
        }
    }
  
    onChange = event => this.setState({ value: event.target.value }, () => {
        const { value } = this.state;
        if (!value.trim()) {
            this.setState({ suggestedList: [] });
        } else {
            if (this.props.search.search) {
                this.setState({ suggestedList: this.props.search.search });
            }
        }
    });

    onSelect = event => this.setState({ value: event.suggestion.value });

    renderSuggestions = () => {
        const { value, suggestedList } = this.state;


        const res = suggestedList.filter((el) => el.book.title.toLowerCase().indexOf(value.toLowerCase()) >= 0)
        .map((el) => ({
            label: (
                <SearchElement id={el.book.id} key={el.book.id} name={el.book.title} image={el.image} author={el.book.authors}></SearchElement>
            ),
            value: ''
            }
        ));
        if (res.length === 0 && value !== '') {
            return [{                
            label: (
                <Box
                    direction='row'
                    align='center'
                    pad='20px'
                >
                    <Text>
                        Ничего не найдено
                    </Text>
                </Box>
            ),
            value: ''}, 
            {label: (
                    <Link className={style.link} to='/search/1' >
                        <Box
                            direction='row'
                            align='center'
                            pad='20px'
                            onClick={() => {
                                this.props.close();
                            }}
                        >
                                <Text>Подробнее..</Text>
                        </Box>
                    </Link>
                ),
            value: ''
            }]
        } else {
            res.push({
                label: (
                    <Link className={style.link} to='/search/1' >
                        <Box
                            direction='row'
                            align='center'
                            pad='20px'
                            onClick={() => {
                                this.props.close();
                            }}
                        >
                                <Text>Подробнее..</Text>
                        </Box>
                    </Link>
                ),
                value: ''
                })
            return res;
        }
        
    };
  
  
    render() {
        const { suggestionOpen, value } = this.state;

        return (
            <Box
                background='background'
                ref={this.boxRef}
                fill
                direction='row'
                align='center'
                margin={{ horizontal: 'xsmall', vertical: 'xsmall' }}
                border={{
                    side: 'bottom',
                    color: suggestionOpen ? 'transparent' : 'border'
                }}
                style={
                    suggestionOpen
                    ? {
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px'
                        }
                    : undefined
                }
            >
                <TextInput
                    type='search'
                    dropTarget={this.boxRef.current}
                    plain
                    value={value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    suggestions={this.renderSuggestions()}
                    placeholder='Найти книгу...'
                    onSuggestionsOpen={() => this.setState({ suggestionOpen: true })}
                    onSuggestionsClose={() =>
                    this.setState({ suggestionOpen: false })
                    }
                />
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

export default connect(mapState, actionCreators)(SearchBar);
