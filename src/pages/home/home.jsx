import './home.scss'

function Home() {
  return (
    <>
      <audio autoPlay>
        <source
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142927/intro.mp3"
          type="audio/mpeg"
        />
      </audio>
      <div className="wrapper">
        <div className="composition">
          <div className="scene scene--1">
            <div className="shooting-star"></div>
            <div className="gamefreak-logo"></div>
            <div className="gamefreak"></div>
            <div className="star-shower-mask">
              <div className="star-shower--light"></div>
              <div className="star-shower--dark"></div>
            </div>
          </div>
          <div className="scene scene--2">
            <section className="opponent jigglypuff-wrapper">
              <figure className="jigglypuff"></figure>
              <figure className="jigglypuff--flinch"></figure>
              <figure className="jigglypuff--tackle"></figure>
            </section>
            <section className="opponent nidorino-wrapper">
              <figure className="nidorino"></figure>
              <figure className="nidorino--flinch"></figure>
              <figure className="nidorino--tackle"></figure>
            </section>
            <section className="gengar-wrapper">
              <figure className="gengar"></figure>
              <figure className="gengar--scratch1"></figure>
              <figure className="gengar--scratch2"></figure>
            </section>
          </div>
          <div className="scene scene--3">
            <div className="logo-wrapper">
              <figure className="pokemon-logo"></figure>
              <span>Poké-Battle</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
