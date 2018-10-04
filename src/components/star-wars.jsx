import React from 'react';
import PropTypes from 'prop-types';

import '../styles/index.css';

const CharacterList = ({ characters }) => {
  const characterItems = characters.map((character, i) => (
    <li key={i}>{character.name}</li>
  ));

  return (
    <ul className='character-list'>
      {characterItems}
    </ul>
  )
};

const StarWars = (props) => {
  const {
    characters, fetchedCount, totalCount, getSearchQuery, searchCharacter
  } = props;
  return (
    <div>
      <h1>Star Wars</h1>
      <div onSubmit={searchCharacter} className='search-box'>
        <input
          type='search'
          id='search'
          name='search-input'
          onKeyPress={(e) => {
            if(e.key === 'Enter') searchCharacter();
          }}
          onChange={(e) => getSearchQuery(e.target.value)} />
        <label htmlFor="search" hidden aria-hidden='false'>Search by name</label>
        <button onClick={searchCharacter}>Find Characters</button>
      </div>

      <span>{fetchedCount} of {totalCount} results</span>
      <CharacterList characters={characters} />
    </div>
  );
};

StarWars.propTypes = {
  characters: PropTypes.array,
  fetchedCount: PropTypes.number,
  totalCount: PropTypes.number,
  getSearchQuery: PropTypes.func,
  searchCharacter: PropTypes.func
};

export default StarWars;
