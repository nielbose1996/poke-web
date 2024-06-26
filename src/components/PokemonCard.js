import React, { useEffect, useState, useRef } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ onLike }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 649) + 1;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchRandomPokemon();
    }
  }, []);

  const handleFetchNewPokemon = () => {
    setLoading(true);
    fetchRandomPokemon();
  };

  const handleLike = () => {
    if (pokemon) {

      onLike(pokemon);
      handleFetchNewPokemon();
    }
  };

  const handleDislike = () => {

    handleFetchNewPokemon();
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="pokemon-card">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} className="pokemon-image" />
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="pokemon-details">
            <div className="pokemon-types">
              <h3>Types</h3>
              <ul>
                {pokemon.types.map(type => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>
            <div className="pokemon-abilities">
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities.map(ability => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pokemon-actions">
            <button className="like-button" onClick={handleLike}>Like</button>
            <button className="dislike-button" onClick={handleDislike}>Dislike</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
