/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { PokemonContext } from "../../context/pokemonContext";
import axios from "axios";
import { motion } from "framer-motion";
import "./PokemonChoice.css";
import { useNavigate } from 'react-router-dom'


const PokemonChoice = () => {
  const { generationOnePokemon } = useContext(PokemonContext);
  const [pokemonName, setPokemonName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [computerPokemon, setComputerPokemon] = useState(null);
  const [selectedPokemonMoves, setSelectedPokemonMoves] = useState([]);
  const [computerPokemonMoves, setComputerPokemonMoves] = useState([]);
  const [isDuelStarted, setIsDuelStarted] = useState(false);
  const [isComputerChosen, setIsComputerChosen] = useState(false);
  const [audio] = useState(new Audio('https://cdn.discordapp.com/attachments/1241083996721643520/1250029362900635668/battle.mp3?ex=66697410&is=66682290&hm=8e97ad5fc57daef1a5583fe69c1940410abe2d63312805a47d460ee43267868b&')); // Define audio

 

  const navigate = useNavigate();


  const handleChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  const fetchPokemonDetails = async (pokemon, setMoves) => {
    const moves = [];
    await Promise.all(
      pokemon.moves.slice(0, 4).map(async (move) => {
        const response = await axios.get(move.move.url);
        moves.push({ name: move.move.name, power: response.data.power });
      })
    );
    setMoves(moves);
  };

  const handleChoosePokemon = async () => {
    const selected =
      generationOnePokemon &&
      generationOnePokemon.find((pokemon) => pokemon.name === pokemonName);
    setSelectedPokemon(selected);

    if (selected) {
      await fetchPokemonDetails(selected, setSelectedPokemonMoves);
    }


    const randomPokemon =
      generationOnePokemon[
        Math.floor(Math.random() * generationOnePokemon.length)
      ];
    setComputerPokemon(randomPokemon);

    if (randomPokemon) {
      await fetchPokemonDetails(randomPokemon, setComputerPokemonMoves);
    }

  
    setIsComputerChosen(true);
  };

  const handleSelectPokemon = (name) => {
    setPokemonName(name);
  };

  const startDuel = () => {
    setIsDuelStarted(true);
      audio.play();
    setTimeout(() => {
      audio.pause();
      navigate("/battle", {state: {selectedPokemon, computerPokemon, selectedPokemonMoves}});
    }, 5000); 
  };

  const handleBack = () => {
    setIsComputerChosen(false);
    setSelectedPokemon(null);
    setComputerPokemon(null);
    setPokemonName("");
    setSelectedPokemonMoves([]);
    setComputerPokemonMoves([]);
  };


  return (
    <div className="pokemon-choice-container">
      <h2>Choisissez votre Pokémon</h2>
      <div className="pokemon-choice-input">
        <input
          type="text"
          placeholder="Nom du Pokémon"
          value={pokemonName}
          onChange={handleChange}
        />
        <button onClick={handleChoosePokemon}>Choisir</button>
      </div>

      {!isComputerChosen && (
        <div className="pokemon-choice-grid">
          {generationOnePokemon.map((pokemon) => (
            <motion.div
              key={pokemon.id}
              className="pokemon-choice-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelectPokemon(pokemon.name)}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-choice-image"
              />
              <h3>{pokemon.name}</h3>
            </motion.div>
          ))}
        </div>
      )}

      {isComputerChosen && (
        <div className="pokemon-choice-result">
          <motion.div
            className="pokemon player"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedPokemon && (
              <div>
                <h3>{selectedPokemon.name}</h3>
                {selectedPokemon.sprites &&
                  selectedPokemon.sprites.front_default && (
                    <img
                      src={selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                      className="pokemon-attack"
                      id="selected-pokemon"
                    />
                  )}
                <p>Type: {selectedPokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>HP: {selectedPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                <p>Attack: {selectedPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                <p>Defense: {selectedPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                <p>Speed: {selectedPokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                <h4>Moves:</h4>
                <ul>
                  {selectedPokemonMoves.map((move, index) => (
                    <li key={index}>
                      {move.name} - Puissance: {move.power}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
          <motion.div
            className="pokemon computer"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {computerPokemon && (
              <div>
                <h3>{computerPokemon.name}</h3>
                {computerPokemon.sprites &&
                  computerPokemon.sprites.front_default && (
                    <img
                      src={computerPokemon.sprites.front_default}
                      alt={computerPokemon.name}
                      className="pokemon-attack"
                      id="computer-pokemon"
                    />
                  )}
                <p>Type: {computerPokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>HP: {computerPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                <p>Attack: {computerPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                <p>Defense: {computerPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                <p>Speed: {computerPokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                <h4>Moves:</h4>
                <ul>
                  {computerPokemonMoves.map((move, index) => (
                    <li key={index}>
                      {move.name} - Puissance: {move.power}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {isComputerChosen && selectedPokemon && computerPokemon && (
        <div className="action-buttons">
          <button onClick={startDuel}>Commencer le duel</button>
          <button onClick={handleBack}>Retour</button>
        </div>
      )}
    </div>
  );
};

export default PokemonChoice;
