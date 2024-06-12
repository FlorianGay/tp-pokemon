/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback } from 'react';
import './battle.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Battle() {
  const location = useLocation();
  const pokemonLevel = 50;
  // Récupération des données du pokémon choisis par le joueur, choisis par l'ordinateur et les attaques
  const { selectedPokemon, computerPokemon, selectedPokemonMoves } = location.state;

  // state pour gérer les données du computer
  const [moveDetails, setMoveDetails] = useState([]);
  const [computerHP, setComputerHP] = useState(computerPokemon.stats[0].base_stat);
  const [computerHPLost, setComputerHPLost] = useState(0);
 

  const [computerMoveDetails, setComputerMoveDetails] = useState(null);
  const computerHPPercentage = (computerHP / selectedPokemon.stats[0].base_stat) * 100;
  const computerHPLostPercentage = (computerHPLost / selectedPokemon.stats[0].base_stat) * 100;

  // state pour gérer les données du user
  const [userHP, setUserHP] = useState(selectedPokemon.stats[0].base_stat);
  const [userHPLost, setUserHPLost] = useState(0);
  const userHPPercentage = (userHP / selectedPokemon.stats[0].base_stat) * 100;
  const userHPLostPercentage = (userHPLost / selectedPokemon.stats[0].base_stat) * 100;
  // state pour gérer le combat
  const [battleResult, setBattleResult] = useState('');
  const [battleMenuOpen, setBattleMenuOpen] = useState(false);
  const [bubbletext, setBubbletext] = useState({
    pokemon: '',
    name: '',
    damage: '',
  });
  const [bubbleTextVisible, setBubbleTextVisible] = useState(false);

const [userPokemonAppeared, setUserPokemonAppeared] = useState(false);
const [computerPokemonAppeared, setComputerPokemonAppeared] = useState(false);


useEffect(() => {
  setTimeout(() => {
    setComputerPokemonAppeared(true);
  }, 1000); // ajustez le délai selon vos préférences

  setTimeout(() => {
    setUserPokemonAppeared(true);
  }, 2000); // ajustez le délai selon vos préférences
}, []);


  // Fonction pour récupérer les détails de l'attaque utilisé par computer
  const getComputerMoveDetails = async (randomMove) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/move/${randomMove.move.name}/`);
    const data = response.data;
    setComputerMoveDetails(data);
  };

  // fonction pour gérer l'affichage de l'attaque utilisée
  const displayBubbleText = (pokemon, moveName, damage) => {
    setBubbleTextVisible(true);
    console.log(moveName, damage);
    setBubbletext({ pokemon: pokemon, name: moveName.name, damage: damage });
    console.log(bubbletext);
    setTimeout(() => {
      setBubbletext({ name: '', damage: '' });
      setBubbleTextVisible(false);
    }, 3000);
  };

  // fonction pour gérer le tour de l'utilisateur
  const userTurn = (move) => {
    let power;
    if (!move.power || !move) {
      power = 0;
    } else {
      power = move.power;
    }
    let userAtk = null;
    let opponentDef = null;
    // Vérifie le type de la capacité, et sélectionne les stat approprié
    if (move.damage_class.name === 'physical') {
      userAtk = selectedPokemon.stats[1].base_stat;
      opponentDef = computerPokemon.stats[2].base_stat;
    } else {
      userAtk = selectedPokemon.stats[3].base_stat;
      opponentDef = computerPokemon.stats[4].base_stat;
    }
    // Calcul des dégâts
    const damage = ((pokemonLevel * 0.4 + 2) * userAtk * power) / (opponentDef * 50) + 2;
    console.log(`le pokemon user a infligé ${damage} de dommage`);
    displayBubbleText(selectedPokemon.name, move, damage);
    // màj de la vie de l'adversaire
    setComputerHP((prevHP) => Math.max(0, prevHP - damage));
    // vérifie si l'adversaire est toujours en vie
    if (computerHP > 0) {
      setTimeout(() => {
        const randomMove = computerPokemon.moves[Math.floor(Math.random() * computerPokemon.moves.length)];
        console.log(randomMove);
        getComputerMoveDetails(randomMove);
      }, 5000);
    } else {
      setBattleResult(`${selectedPokemon.name} a gagné !`);
    }
  };

  // fonction pour gérer le tour de l'ordinateur
  const executeOpponentMove = (move) => {
    // displayBubbleComputerText(move);
    if (computerHP === 0) {
      setBattleResult(`${selectedPokemon.name} a gagné !`);
      return;
    }
    let opponentAtk = null;
    let userDef = null;
    const power = move.power;
    // Vérifie le type de la capacité, et sélectionne les stat approprié
    if (move.damage_class.name === 'physical') {
      opponentAtk = computerPokemon.stats[1].base_stat;
      userDef = selectedPokemon.stats[2].base_stat;
    } else {
      opponentAtk = computerPokemon.stats[3].base_stat;
      userDef = selectedPokemon.stats[4].base_stat;
    }
    // Calcul des dégâts
    const damage = ((pokemonLevel * 0.4 + 2) * opponentAtk * power) / (userDef * 50) + 2;
    console.log(`le pokemon computer a infligé ${damage} de dommage`);
    displayBubbleText(computerPokemon.name, move, damage);
    // màj de la vie de l'adversaire
    setUserHP((prevHP) => {
      const newHP = Math.max(0, prevHP - damage);
      if (newHP === 0) {
        setBattleResult(`${computerPokemon.name} a gagné !`);
      }
      setUserHP(newHP);
      return newHP;
    });
  };

  // Fonction pour débuter un tour de combat
  const handleTurn = (move) => {
    userTurn(move);
  };

  // Fonction pour gérer l'affichage des attaques du pokémon de l'utilisateur
  const handleOpenMenuAtk = () => {
    if (!battleMenuOpen) {
      setBattleMenuOpen(true);
    } else {
      setBattleMenuOpen(false);
    }
  };

  // Met à jour les PV de l'utilisateur
  useEffect(() => {
    setUserHPLost(selectedPokemon.stats[0].base_stat - userHP);
  }, [userHP]);

  // Met à jour les PV de l'ordinateur
  useEffect(() => {
      setComputerHPLost(computerPokemon.stats[0].base_stat - computerHP);
  }, [computerHP]);

  // Récupère les détails des attaques du pokémon de l'utilisateur
  useEffect(() => {
    const fetchAllMovesDetails = async () => {
      const movesData = await Promise.all(
        selectedPokemonMoves.map(async (move) => {
          const response = await axios.get(`https://pokeapi.co/api/v2/move/${move.name}/`);
          return response.data;
        })
      );
      setMoveDetails(movesData);
    };
    fetchAllMovesDetails();
  }, []);

  // Vérifie si les attaques d' l'ordinateur sont bien récupérer, et si oui joue le tour de l'adversaire
  useEffect(() => {
    if (computerMoveDetails) {
      executeOpponentMove(computerMoveDetails);
    }
  }, [computerMoveDetails]);

  return (
    // Info de l'ordinateur
    <main> 
      <section className="opponent"style={{ display: computerPokemonAppeared ? 'flex' : 'none' }}>
        
        <audio >
        <source src={computerPokemon.cries.latest} type="audio/mpeg" />
      </audio>
        <div className="info">
          <div className="info-up">
            <h3>{computerPokemon.name}</h3>
            <p>Lv {pokemonLevel}</p>
          </div>
          <div className="hp-info">
            <p>HP </p>
            <div className="hp-bar">
              <div
                className="hp-lost"
                style={{
                  width: `${computerHPLostPercentage}%`,
                  height: '22px',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  top: '0',
                  left: '0',
                  transition: 'width 0.5s ease-in-out',
                  borderRadius: '10px',
                }}
              ></div>
            </div>
            {/* {bubbleComputertext ? <div className="bubble">{bubbleComputertext}</div> : ''} */}
          </div>
        </div>
        <div className="sprite" >
          <img src={computerPokemon.sprites.other.showdown.front_default} alt="" />
        </div>
      </section>

      {/* Info de l'utilisateur */}
      <section className="user" style={{ display: userPokemonAppeared ? 'flex' : 'none' }}>
      <audio >
        <source src={selectedPokemon.cries.latest} type="audio/mpeg" />
      </audio>
        <div className="sprite" >
          <img src={selectedPokemon.sprites.other.showdown.back_default} alt="" />
        </div>
        <div className="info">
          <div className="info-up">
            <h3>{selectedPokemon.name}</h3>
            <p>Lv {pokemonLevel}</p>
          </div>
          <div className="hp-info">
            <p>HP</p>
            <div className="hp-bar">
              <div
                className="hp-lost"
                style={{
                  width: `${userHPLostPercentage}%`,
                  height: '22px',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  top: '0',
                  left: '0',
                  transition: 'width 0.5s ease-in-out',
                  borderRadius: '10px',
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {battleResult ? (
        <h1 className="battle-result">{battleResult}</h1>
      ) : (
        <>
          {' '}
          <section className="user-menu" style={{ display: battleMenuOpen || !userPokemonAppeared ? 'none' : 'flex' }}>
            <div className="menu-description">
              <p>
                Que doit faire <br /> {selectedPokemon.name} ?
              </p>
            </div>
            <div className="menu-option">
              <button onClick={() => handleOpenMenuAtk()}>Attaque</button>
              <button>Ball</button>
              <button>Pokémon</button>
              <button>Fuite</button>
            </div>
          </section>
          <div className="menu-attaque" style={{ display: battleMenuOpen ? 'flex' : 'none' }}>
            <button onClick={() => setBattleMenuOpen(false)}>Retour</button>
            <div className="attaque-option">
              {moveDetails.map((moveData) => (
                <div className="attaque" key={moveData.id}>
                  <button onClick={() => handleTurn(moveData)}>{moveData.name}</button>
                  <div className="description-attaque">
                    <div>
                      <span>{moveData.type.name}</span>
                      <span>{moveData.damage_class.name}</span>
                    </div>
                    <div>
                      <p>PP</p>
                      <p>
                        {moveData.pp} / {moveData.pp}
                      </p>
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
          <div className="attaque-details" style={{ display: bubbleTextVisible ? 'block' : 'none' }}>
            <p>
              {bubbletext.pokemon} a utilisé {bubbletext.name}
            </p>
            <p>
              {bubbletext.name} inflige {bubbletext.damage} de dégats
            </p>
          </div>
        </>
      )}
    </main>
  );
}

export default Battle;
