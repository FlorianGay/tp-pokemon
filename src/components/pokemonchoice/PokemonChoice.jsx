import React, { useContext, useState } from "react";
import { PokemonContext } from "../../context/pokemonContext";
import axios from "axios";
import { motion } from "framer-motion";
import "./PokemonChoice.css";

const PokemonChoice = () => {
  const { generationOnePokemon } = useContext(PokemonContext);
  const [pokemonName, setPokemonName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [computerPokemon, setComputerPokemon] = useState(null);
  const [selectedPokemonMoves, setSelectedPokemonMoves] = useState([]);
  const [computerPokemonMoves, setComputerPokemonMoves] = useState([]);
  const [isDuelStarted, setIsDuelStarted] = useState(false);
  const [isComputerChosen, setIsComputerChosen] = useState(false);

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
    setTimeout(() => {
      window.location.href = "/battle";
    }, 5000); 
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
          <div className="pokemon player">
            {selectedPokemon && (
              <div>
                <h3>{selectedPokemon.name}</h3>
                {selectedPokemon.sprites &&
                  selectedPokemon.sprites.front_default && (
                    <img
                      src={selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                      className="pokemon-attack"
                    />
                  )}
                <p>Type: {selectedPokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>HP: {selectedPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                <p>Attack: {selectedPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                <p>Defense: {selectedPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                <p>Speed: {selectedPokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                <h4>Attaques:</h4>
                <ul>
                  {selectedPokemonMoves.map((move, index) => (
                    <li key={index}>
                      {move.name} - Puissance: {move.power}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="pokemon computer">
            {computerPokemon && (
              <div>
                <h3>{computerPokemon.name}</h3>
                {computerPokemon.sprites &&
                  computerPokemon.sprites.front_default && (
                    <img
                      src={computerPokemon.sprites.front_default}
                      alt={computerPokemon.name}
                      className="pokemon-attack"
                    />
                  )}
                <p>Type: {computerPokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>HP: {computerPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                <p>Attack: {computerPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                <p>Defense: {computerPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                <p>Speed: {computerPokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                <h4>Attaques:</h4>
                <ul>
                  {computerPokemonMoves.map((move, index) => (
                    <li key={index}>
                      {move.name} - Puissance: {move.power}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {isComputerChosen && selectedPokemon && computerPokemon && (
        <button onClick={startDuel}>Commencer le duel</button>
      )}
    </div>
  );
};

export default PokemonChoice;
