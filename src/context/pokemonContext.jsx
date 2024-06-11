

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [generationOnePokemon, setGenerationOnePokemon] = useState([]);

  useEffect(() => {
    const fetchGenerationOnePokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonData = response.data.results;

        const detailedPokemonPromises = pokemonData.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const detailedPokemonResponses = await Promise.all(
          detailedPokemonPromises
        );
        const detailedPokemonData = detailedPokemonResponses.map(
          (res) => res.data
        );

        const pokemonWithAttackDetailsPromises = detailedPokemonData.map(
          async (pokemon) => {
            const response = await axios.get(pokemon.moves[0].move.url);
            pokemon.attackDetails = response.data;
            return pokemon;
          }
        );
        const pokemonWithAttackDetails = await Promise.all(
          pokemonWithAttackDetailsPromises
        );

        setGenerationOnePokemon(pokemonWithAttackDetails);
      } catch (error) {
        console.error("Erreur pour récupérer les pokemons de la generation 1", error);
      }
    };
    fetchGenerationOnePokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ generationOnePokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
