import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import PokemonCard from './components/PokemonCard';
import LikedPokemon from './components/LikedPokemon';
import './App.css';

const App = () => {
  const [started, setStarted] = useState(false);
  const [likedPokemons, setLikedPokemons] = useState([]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleLike = (pokemon) => {
    if (!likedPokemons.find((p) => p.id === pokemon.id)) {
      setLikedPokemons((prevLikedPokemons) => [...prevLikedPokemons, pokemon]);
    }
  };
  

  return (
    <div className="App">
      <header className="app-header">PokéApi</header>
      {!started ? (
        <WelcomeScreen onStart={handleStart} />
      ) : (
        <>
          <PokemonCard onLike={handleLike} />
          <LikedPokemon likedPokemons={likedPokemons} />
        </>
      )}
    </div>
  );
};

export default App;
