import './battle.scss'

function Battle() {
  return (
    <main>
      <section className="opponent">
        <div className="info">
          <div className="info-up">
            <h3>Mewtwo</h3>
            <p>Lv5</p>
          </div>

          <div className="hp-bar">
            <p>HP</p>
            <div className="hp"></div>
          </div>
        </div>

        <div className="sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/150.gif"
            alt=""
          />
        </div>
      </section>

      <section className="user">
        <div className=" sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/151.gif"
            alt=""
          />
        </div>

        <div className=" info">
          <div className="info-up">
            <h3>Mew</h3>
            <p>Lv5</p>
          </div>

          <div className="hp-bar">
            <p>HP</p>
            <div className="hp"></div>
            <p>20/20</p>
          </div>
        </div>
      </section>

      <section className="user-menu">
        <div className="menu-description">
          <p>
            Que doit faire <br /> Mew ?
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
          <button>Psyko</button>
          <button>Soin</button>
          <button>Rafale Psy</button>
          <button>Metronome</button>
        </div>
        <div className="description-attaque">
          <div>
            <span>Type</span>
            <span>Type</span>
          </div>
          <div>
            <p>PP</p>
            <p>10/10</p>
          </div>
          <div>
            <p>Puissance</p>
            <p>90</p>
          </div>
          <div>
            <p>Précision</p>
            <p>100</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Battle
