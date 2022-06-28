import './styles.scss';

import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import { pokedex } from './react-pokedex.json';
import { icons } from './type-icons.json';

const PokedexType = (props) => {
  const { typesArray } = props;
  const typeImage = typesArray.map((type) => (
    <img src={icons[type]} height="30px" width="30px" alt={`${type} type icon`} />
  ));

  return (typeImage);
};

const PokedexEntries = (props) => {
  const { entriesArray } = props;
  const pokemonEntries = Object.keys(entriesArray).map((key) => (
    <div>
      <strong>
        {key}
        :
        {' '}
      </strong>
      {entriesArray[key].en}
    </div>
  ));

  return (<div>{pokemonEntries}</div>);
};

PokedexEntries.propTypes = {
  entriesArray: PropTypes.shape({
    version: PropTypes.shape({
      language: PropTypes.string,
    }),
  }).isRequired,
};

const Pokemon = (props) => {
  const { pokedexData } = props;
  const pokemonList = pokedexData.map((pokemon) => (
    <li key={pokemon.national_id}>
      <h3>
        {pokemon.names.en}
        {' '}
        <PokedexType typesArray={pokemon.types} />
      </h3>
      <PokedexEntries entriesArray={pokemon.pokedex_entries} />
      <br />
    </li>
  ));

  return (<ol>{pokemonList}</ol>);
};

Pokemon.propTypes = {
  pokedexData: PropTypes.shape({
    pokemon: PropTypes.shape({
      national_id: PropTypes.number,
      names: PropTypes.shape({
        language: PropTypes.string,
      }),
    }),
  }).isRequired,
};

const RenderPokedex = () => {
  const pokedexData = pokedex.slice(0, 20); // slice for 20 pokemon
  // const pokedexData = pokemon.pokedex; // no slice for all pokemon
  return (
    <div>
      <Pokemon pokedexData={pokedexData} />
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

render(<RenderPokedex />, rootElement);
