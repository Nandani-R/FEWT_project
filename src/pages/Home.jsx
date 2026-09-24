
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import { Link } from 'react-router-dom'

function Home() {

  return (

    <>

      <Navbar />

      {/* HERO */}

      <section className="hero">

        <div className="container">

          <div className="hero-content">

            <div className="eyebrow">
              MOVIES · SERIES · STORIES
            </div>

            <h1>
              Find something worth
              <span> bingeing.</span>
            </h1>

            <p>
              BingeHouse is your personal corner
              for discovering movies and web series.
            </p>

          </div>

          {/* EXPLORE BUTTONS */}

      <section className="explore container">

        <Link to="/movies" className="explore-btn">
          Explore Movies
        </Link>

        <Link to="/series" className="explore-btn">
          Explore Web Series
        </Link>

      </section>

        </div>


      </section>


      {/* MOVIES */}

      <section className="section container">

        <div className="section-head">

          <div>

            <h2>
              Tonight's Picks
            </h2>

            <p>
              A hand-picked mix for your next watch.
            </p>

          </div>

        </div>


        <div className="grid">

          <MovieCard
            title="Inception"
            year="2010"
            genre="Sci-Fi"
            rating="8.8"
            image="https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg"
          />

          <MovieCard
            title="Interstellar"
            year="2014"
            genre="Sci-Fi"
            rating="8.7"
            image="https://image.tmdb.org/t/p/original/i4PpBcuLvdcJwIf3hkcV9QDR1iH.jpg"
          />

          <MovieCard
            title="The Dark Knight"
            year="2008"
            genre="Action"
            rating="9.0"
            image="https://image.tmdb.org/t/p/original/7yAPPLZpTnPN7qb1qSCNuotQpew.jpg"
          />

          <MovieCard
            title="Titanic"
            year="1997"
            genre="Romance"
            rating="7.9"
            image="https://image.tmdb.org/t/p/original/8MFJ4aAr85B5lVCecxGSd9iX6FX.jpg"
          />

        </div>

      </section>


      <Footer />

    </>

  )
}

export default Home