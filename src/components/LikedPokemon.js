import React from 'react';
import './LikedPokemon.css';

const LikedPokemon = ({ likedPokemons }) => {
  return (
    <div className="liked-pokemon">
      <h2>Your Pokémon Dream Team</h2>
      <div className="liked-pokemon-list">
        {likedPokemons.map(pokemon => (
          <div key={pokemon.id} className="liked-pokemon-card">
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} 
              alt={pokemon.name} 
              className="liked-pokemon-image" 
            />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedPokemon;
