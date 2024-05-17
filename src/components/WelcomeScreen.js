import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="instructions">
        <h3>How to Play PokéSwipe</h3>
        <p>Pokémon Appear One at a Time</p>
        <p>Choose "Like" or "Dislike"</p>
        <p>Build Your Favorite Team</p>
      </div>
      <button className="start-button" onClick={onStart}>Let's Go!</button>
    </div>
  );
};

export default WelcomeScreen;
