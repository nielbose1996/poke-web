import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './PokemonCard.css';

const PokemonCard = ({ onLike }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true); // To track the first render

  const fetchRandomPokemon = async () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 649) + 1;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Skip fetching on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchRandomPokemon();
  }, []);

  const handleFetchNewPokemon = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const { name, abilities, types, id } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} className="pokemon-image" />
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-details">
        <div className="pokemon-types">
          <h3>Types</h3>
          <ul>
            {types.map(type => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="pokemon-abilities">
          <h3>Abilities</h3>
          <ul>
            {abilities.map(ability => (
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
  );
};

export default PokemonCard;
