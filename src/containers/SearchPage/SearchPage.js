import React, { createRef, Component } from 'react';
import { Search, Next, Previous } from 'grommet-icons';
import { 
    Box, 
    TextInput
} from 'grommet';
import { connect } from 'react-redux';

import { searchActions } from '../../store/actions';
import Filter from '../../components/Filter/Filter';
import Book from '../../components/Books/Book';
import Gallery from '../../components/Gallery/Gallery';

import styles from './SearchPage.module.css'
import { Link, NavLink } from 'react-router-dom';




class SearchPage extends Component {
    state = { 
        value: '', 
        suggestedList: [], 
        genre: -1, 
        page: Number(this.props.match.params.page), 
        pageItems: [], 
        max: 1
    };

    boxRef = createRef();
  

    componentDidMount() {
        const { page } = this.state;
        this.props.request('', page, '');
        this.forceUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
        let { value, genre } = this.state;
        if (prevState.page !== Number(this.props.match.params.page)) {
            if (genre === -1) genre = '';

            this.setState({page: Number(this.props.match.params.page)});
            this.props.request(value, Number(this.props.match.params.page), genre);
        }

        if (this.state.max !== this.props.search.pages) {
            this.setState({max: this.props.search.pages});
        }
    }
  
    onChange = event => this.setState({ value: event.target.value }, () => {
        const { value } = this.state;
        let genre = '';
        if (this.state.genre !== -1) {
            genre = this.state.genre;
        }
        this.props.request(value, 1, genre);
    });


    onSelect = event => this.setState({ value: event.suggestion.value });


    renderSearchResult = () => {
        let res = this.props.search.search;
        
        return(
            <Gallery 
                object={(title, coverage, genre, author, id, idAbstract) => <Book info handleDeleteBook={this.props.deleteBook} margin='10px' author={author} genre={genre} title={title} coverage={coverage} key={idAbstract} id={idAbstract}></Book>} 
                objectList={res}
                contentType='books'
            ></Gallery>)
    };

    onGenreChange(genre) {
        const { value } = this.state;
        this.setState({genre: genre});
        if (genre === -1) {
            genre = '';
        }
        this.props.request(value, 1, genre);
    }

    Next() {
        let { value, genre, page, max } = this.state;
        if (page < max) {
            window.scrollTo(0,0);

            if (genre === -1) genre = '';
            this.props.request(value, page + 1, genre);

            this.setState({page: page + 1});
        }
    }

    Previous() {
        let { value, genre, page } = this.state;
        if (this.state.page >= 2) {
            window.scrollTo(0,0);

            if (genre === -1) genre = '';
            this.props.request(value, page - 1, genre);

            this.setState({page: page - 1});
        }
    }

    Pages() {
        const { page, max } = this.state;
        const el = (page) =>                     
            (<NavLink className={styles.page} activeClassName={styles.activePage} to={`/search/${page}`}>
                {page}
            </NavLink>);
        if (max === 1) {
            return (
                <Box direction='row' gap='20px'>
                    {el(1)}
                </Box>
            );
        } else if (max === 2) {
            return (
                <Box direction='row' gap='20px'>
                    {el(1)}
                    {el(2)}
                </Box>
            );
        } else if (max === 3) {
            return (
                <Box direction='row' gap='20px'>
                    {el(1)}
                    {el(2)}
                    {el(3)}
                </Box>
            );
        } else if (page === 1) {
            return (
                <Box direction='row' gap='20px'>
                    {el(page)}
                    {el(page+1)}
                    {el(page+2)}
                </Box>
            );
        } else if (page === max) {
            return (
                <Box direction='row' gap='20px'>
                    {el(page-2)}
                    {el(page-1)}
                    {el(page)}
                </Box>
            );
        } else {
            return (
                <Box direction='row' gap='20px'>
                    {el(page-1)}
                    {el(page)}
                    {el(page+1)}
                </Box>
            );
        }
    }
  
    render() {
        const { value, page } = this.state;

        return (
            <Box direction='column' align='center' width='xxlarge'>
                <Box fill='horizontal' direction='row' align='center' wrap>
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
                        <Filter updateGenre={(genre) => this.onGenreChange(genre)}></Filter>
                    </Box>
                </Box>
                <Box justify='center' direction='row' wrap fill>
                    {this.props.search.found &&
                        this.renderSearchResult()
                    }
                </Box>

                {this.state.genre === -1 && this.state.value === '' &&
                    <Box margin='10px' gap='10px' direction='row'>
                        {this.state.max !== 1 && 
                            <Link to={`/search/${page > 1 ? page-1 : page}`}>
                                <Previous className={page > 1 ? styles.active : styles.disabled} onClick={() => this.Previous()}></Previous>
                            </Link>
                        }
                        {this.Pages()}
                        {this.state.max !== 1 && 
                            <Link to={`/search/${page < this.state.max ? page+1 : page}`}>
                                <Next className={page < this.state.max ? styles.active : styles.disabled} onClick={() => this.Next()}></Next>
                            </Link>
                        }
                    </Box>
                }

            </Box>
        );
    }
}

const mapState = state => ({
    search: state.search
})

const actionCreators = {
    request: searchActions.search
}

const connectedSearchPage = connect(mapState, actionCreators)(SearchPage);

export { connectedSearchPage as SearchPage };