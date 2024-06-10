import './pokemonUiBatlle.scss'

function PokemonUiBattle() {
  return (
    <>
      <div className="opponents">
        <div className=" info">
          <div className="info-up">
            <h3>Mewtwo</h3>
            <p>Lv5.</p>
          </div>

          <div className=" hp-bar">
            <p>HP</p>
            <div className="hp"></div>
          </div>
        </div>

        <div className=" sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/150.gif"
            alt=""
          />
        </div>
      </div>

      <div className="player">
        <div className="player-sprite sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/151.gif"
            alt=""
          />
        </div>

        <div className="player-info info">
          <div className="info-up">
            <h3>Mew</h3>
            <p>Lv5.</p>
          </div>

          <div className="hp-bar">
            <p>HP</p>
            <div className="hp"></div>
            <p>20/20</p>
          </div>
        </div>
      </div>

      <div className=" player-menu">
        <button>Attaque 1</button>
        <button>Attaque 2</button>
        <button>Attaque 3</button>
        <button>Attaque 4</button>
      </div>
    </>
  )
}

export default PokemonUiBattle
