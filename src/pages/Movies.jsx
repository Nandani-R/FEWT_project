import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'

function Movies() {

  return (

    <>

      <Navbar />

      <header className="page-header">

        <div className="container">

          <h1>
            Movies
          </h1>

          <p>
            Stories made for the big screen,
            ready for your screen.
          </p>

        </div>

      </header>


      <main className="section container">

        <div className="filters">

          <span>All</span>
          <span>Action</span>
          <span>Drama</span>
          <span>Sci-Fi</span>
          <span>Comedy</span>
          <span>Romance</span>

        </div>


        <div className="grid">

          <MovieCard
            id={1}
            title="Inception"
            year="2010"
            genre="Sci-Fi"
            rating="8.8"
            image="https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg"
          />

          <MovieCard
            id={2}
            title="Shawshank Redemption"
            year="1994"
            genre="Drama"
            rating="9.3"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa971-ExbXJYq9XCH9CeqcWzpeksshtl4tWsP15YNxxvU1v-LrOLcZsz2F&s=10"
          />

          <MovieCard
            id={3}
            title="Interstellar"
            year="2014"
            genre="Sci-Fi"
            rating="8.7"
            image="https://image.tmdb.org/t/p/original/i4PpBcuLvdcJwIf3hkcV9QDR1iH.jpg"
          />

          <MovieCard
            od={4}
            title="Titanic"
            year="1997"
            genre="Romance"
            rating="7.9"
            image="https://image.tmdb.org/t/p/original/8MFJ4aAr85B5lVCecxGSd9iX6FX.jpg"
          />

          <MovieCard
            id={5}
            title="The Dark Knight"
            year="2008"
            genre="Action"
            rating="9.0"
            image="https://image.tmdb.org/t/p/original/7yAPPLZpTnPN7qb1qSCNuotQpew.jpg"
          />

          <MovieCard
            id={6}
            title="The Matrix"
            year="1999"
            genre="Sci-Fi"
            rating="8.7"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuouvs1O2Ymqo0f2-9Rs6qt33kHti7lbxrJ1dVtP52sZ2ynQqmNxslxfSG&s=10"
          />

          <MovieCard
            id={7}
            title="Forrest Gump"
            year="1994"
            genre="Drama"
            rating="8.8"
            image="https://image.tmdb.org/t/p/original/yu26pJwGFUyqTJWMWo1mMgBFJ0N.jpg"
          />

          <MovieCard
            id={8}
            title="Avengers: Endgame"
            year="2019"
            genre="Action"
            rating="8.4"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhFI8O9QPCgK9sLLvPPvhGBbjOaHsWLZwGDFez2Fr1Q&s"
          />

        </div>

      </main>


      <Footer />

    </>

  )
}

export default Movies