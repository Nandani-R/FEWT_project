import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GenreCard from '../components/GenreCard'

function Genres() {

  return (

    <>

      <Navbar />

      <header className="page-header">

        <div className="container">

          <h1>
            Pick a Mood
          </h1>

          <p>
            Don't know what to watch?
            Start with a feeling.
          </p>

        </div>

      </header>


      <main className="section container">

        <div className="genre-grid">

          <GenreCard
            title="Action"
            description="Fast, bold and impossible to pause."
            image="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
          />

          <GenreCard
            title="Romance"
            description="Stories with heart."
            image="https://image.tmdb.org/t/p/original/8MFJ4aAr85B5lVCecxGSd9iX6FX.jpg"
          />

          <GenreCard
            title="Sci-Fi"
            description="Worlds beyond the ordinary."
            image="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
          />

          <GenreCard
            title="Thriller"
            description="Keep guessing until the end."
            image="https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
          />

          <GenreCard
            title="Drama"
            description="Characters and stories that stay with you."
            image="https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
          />

          <GenreCard
            title="Comedy"
            description="Something lighter for tonight."
            image="https://image.tmdb.org/t/p/original/irUIeUE9yFyvRIeS24duTLnCxAz.jpg"
          />

        </div>

      </main>


      <Footer />

    </>

  )
}

export default Genres