/* eslint-disable react/prop-types */
import { createContext, useState, useEffect} from "react";
import axios from "axios";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [generationOnePokemon, setGenerationOnePokemon] = useState([]);

    useEffect(() => {
        const fetchGenerationOnePokemon  = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
                const pokemonData = response.data.results;
                console.log(response.data.results)
                setGenerationOnePokemon(pokemonData); 
                console.log(generationOnePokemon)
                 } catch (error) {
                        console.error("Erreur pour récuperer les pokemons de la generation 1");  
                    }
        }; 
        fetchGenerationOnePokemon();
    }, []);

    return (
    <PokemonContext.Provider value= {{ generationOnePokemon }}>
        {children} 
    </PokemonContext.Provider>
    );
}