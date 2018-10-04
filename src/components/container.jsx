import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Actions from '../actions';

import StarWars from './star-wars';

class Container extends Component {

  constructor() {
    super();

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { fetchCharacters } = this.props;
    fetchCharacters();

     window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    const { fetchCharacters, isLoading } = this.props;
    if((window.innerHeight + window.scrollY > document.body.offsetHeight) &&
      !isLoading) {
      fetchCharacters();
    }
  }

  render() {
    return (
      <StarWars {...this.props} />
    );
  }
}

Container.propTypes = {
  fetchCharacters: PropTypes.func,
  isLoading: PropTypes.bool
};

const mapStateToProps = (data) => ({
  totalCount: data.totalCount,
  fetchedCount: data.fetchedCount,
  characters: data.characters,
  isLoading: data.isLoading
});

const mapDispatchToProps = (dispatch)  => ({
  fetchCharacters: () => dispatch(Actions.fetchCharacters()),
  searchCharacter: () => dispatch(Actions.searchCharacter()),
  getSearchQuery: (name) => dispatch(Actions.getSearchQuery(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
