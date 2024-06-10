/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { useContext, useState } from 'react'
import { PokemonContext } from '../../context/pokemonContext'

const PokemonChoice = () => {
  const { generationOnePokemon } = useContext(PokemonContext)
  const [pokemonName, setPokemonName] = useState('')
  const [selectedPokemon, SetSelectedPokemon] = useState(null)

  const handleChange = (event) => {
    setPokemonName(event.target.value.toLowerCase())
  }

  const handleChoosePokemon = () => {
    const selected =
      generationOnePokemon &&
      generationOnePokemon.find((pokemon) => pokemon.name === pokemonName)
    console.log('Selected Pokemon:', selected) // Afficher le Pokémon sélectionné dans la console
    SetSelectedPokemon(selected)
  }
  console.log('Pokemon List:', generationOnePokemon) // Afficher la liste des Pokémon dans la console

  return (
    <div>
      <h2>Choisissez votre pokemon</h2>
      <input
        type="text"
        placeholder="Nom du pokemon"
        value={pokemonName}
        onChange={handleChange}
      />
      <button onClick={handleChoosePokemon}>Choisir</button>
      {selectedPokemon && (
        <div>
          <h3>{selectedPokemon.name}</h3>
          {selectedPokemon.sprites && selectedPokemon.sprites.front_default && (
            <img src={selectedPokemon.sprites.front_default} />
          )}
        </div>
      )}
    </div>
  )
}
export default PokemonChoice
