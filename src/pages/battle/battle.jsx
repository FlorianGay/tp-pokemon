/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback } from 'react'
import './battle.scss'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Battle() {
  const location = useLocation()
  const { selectedPokemon, computerPokemon, selectedPokemonMoves } = location.state
  const [moveDetails, setMoveDetails] = useState([])
  const pokemonLevel = 50


  const [computerHP, setComputerHP] = useState(computerPokemon.stats[0].base_stat)
  const [userHP, setUserHP] = useState(selectedPokemon.stats[0].base_stat)

  const [isUserTurn, setIsUserTurn] = useState(true)
  const [battleResult, setBattleResult] = useState('')

//   const handleUserAction = (move) => {
//     const power = selectedPokemonMoves.find((m) => m.name === move).power
//     const damage = Math.floor(power *(Math.random() * 0.5 + 0.5))
//     setcomputerHP(prevHP => Math.max(0, prevHP - damage))
//     console.log(computerHP)
//     setIsUserTurn(false)
//     setTimeout(handleComputerAction, 1000)
//   }
//   const handleComputerAction = (move) =>{
//     const randomMove = computerPokemon.moves[Math.floor(Math.random()*computerPokemon.moves.length)]
//     const power = randomMove.power
//     const damage = Math.floor(power *(Math.random() * 0.5 + 0.5))
//     setUserHP (prevHP => Math.max(0, prevHP - damage))
//     console.log(userHP)
//     setIsUserTurn(true)
//   }


  useEffect(() => {
    const fetchAllMovesDetails = async () => {
      const movesData = await Promise.all(
        selectedPokemonMoves.map(async (move) => {
          const response = await axios.get(`https://pokeapi.co/api/v2/move/${move.name}/`)
          return response.data
        })
      )
      setMoveDetails(movesData)
    }
    fetchAllMovesDetails()
  }, [])

//   useEffect(() => {
//     if (userHP === 0 || computerHP === 0) {
//       if (userHP === 0 && computerHP === 0) {
//         setBattleResult('Egalite')
//         console.log(battleResult)
//       } else if (userHP === 0) {
//         setBattleResult('Perdu')
//         console.log(battleResult)

//       } else if (computerHP === 0) {
//         setBattleResult('Gagne')
//         console.log(battleResult)

//       } else {
//         if (!isUserTurn){
//           handleComputerAction()
//         }
//       }
      
//     }}, [isUserTurn, userHP, computerHP, handleComputerAction])


const userTurn = (move) => {
    console.log('tour de l utilisateur')
    console.log(move)
    let userAtk = null 
    let opponentDef = null 
    const power = move.power
    if (move.damage_class === 'physical') {
        userAtk = selectedPokemon.stats[1].base_stat
        opponentDef = computerPokemon.stats[2].base_stat
    } else {
        userAtk = selectedPokemon.stats[3].base_stat
        opponentDef = computerPokemon.stats[4].base_stat
    }

    const damage = (userAtk * power) / (opponentDef * 50 ) + 2
    console.log(userAtk, power, opponentDef)
    console.log(damage)
    setComputerHP(computerHP - damage)

    if (computerHP != 0) {
        opponentTurn()
    } else {
        return <h1>{selectedPokemon.name} a gagné !</h1>
    }
}

const opponentTurn = () => {
    console.log('tour de l opposant')
    let opponentAtk = null
    let userDef = null
    const randomMove = computerPokemon.moves[Math.floor(Math.random()*computerPokemon.moves.length)]
    const power = randomMove.power
    if (randomMove.damage_class === 'physical') {
         opponentAtk = computerPokemon.stats[1].base_stat
         userDef = selectedPokemon.stats[2].base_stat
    } else {
         opponentAtk = computerPokemon.stats[3].base_stat
         userDef = selectedPokemon.stats[4].base_stat
    }

    const damage = ((opponentAtk * power) / (userDef * 50 )) + 2
    console.log(damage)
    setUserHP(userHP - damage)

    if (userHP != 0) {
        userTurn()
    } else {
        return <h1>{computerPokemon.name} a gagné !</h1>
    }
}

const handleTurn = (move) => {
    console.log(move)
    userTurn(move)
}

  return (
    <main>
      <section className="opponent">
        <div className="info">
          <div className="info-up">
            <h3>{computerPokemon.name}</h3>
            <p>Lv {pokemonLevel}</p>
          </div>

          <div className="hp-bar">
            <p>HP</p>
            <div className="hp"></div>
          </div>
        </div>

        <div className="sprite">
          <img
            src={computerPokemon.sprites.other.showdown.front_default}
            alt=""
          />
        </div>
      </section>

      <section className="user">
        <div className=" sprite">
          <img
            src={selectedPokemon.sprites.other.showdown.back_default}
            alt=""
          />
        </div>

        <div className=" info">
          <div className="info-up">
            <h3>{selectedPokemon.name}</h3>
            <p>Lv {pokemonLevel}</p>
          </div>

          <div className="hp-bar">
            <p>HP</p>
            <div className="hp"></div>
            <p>{selectedPokemon.stats[0].base_stat}</p>
          </div>
        </div>
      </section>

      <section className="user-menu">
        <div className="menu-description">
          <p>
            Que doit faire <br /> {selectedPokemon.name} ?
          </p>
        </div>
        <div className="menu-option">
          <button>Attaque</button>
          <button>Ball</button>
          <button>Pokémon</button>
          <button>Fuite</button>
        </div>
      </section>

      <div className="menu-attaque">
        <div className="attaque-option">
        {moveDetails.map((moveData) => (
            <div className='attaque' key={moveData.id}>
              <button onClick={() => handleTurn(moveData)}> {moveData.name} </button>
                <div className="description-attaque">
                <div>
                  <span>{moveData.type.name}</span>
                  <span>{moveData.damage_class.name}</span>
                </div>
                <div>
                  <p>PP</p>
                  <p>{moveData.pp} / {moveData.pp}</p>
                </div>
                <div>
                  <p>Puissance</p>
                  <p>{moveData.power}</p>
                </div>
                <div>
                  <p>Précision</p>
                  <p>{moveData.accuracy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Battle
