import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'

function Series() {

  return (

    <>

      <Navbar />

      <header className="page-header">

        <div className="container">

          <h1>
            Web Series
          </h1>

          <p>
            Long-form stories for those
            "just one more episode" nights.
          </p>

        </div>

      </header>


      <main className="section container">

        <div className="filters">

          <span>All</span>
          <span>Drama</span>
          <span>Crime</span>
          <span>Sci-Fi</span>
          <span>Comedy</span>

        </div>


        <div className="grid">

          <MovieCard
            title="Stranger Things"
            year="2016"
            genre="Sci-Fi"
            rating="8.6"
            image="https://image.tmdb.org/t/p/original/cVxVGwHce6xnW8UaVUggaPXbmoE.jpg"
          />

          <MovieCard
            title="Breaking Bad"
            year="2008"
            genre="Crime"
            rating="9.5"
            image="https://image.tmdb.org/t/p/original/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg"
          />

          <MovieCard
            title="Game of Thrones"
            year="2011"
            genre="Drama"
            rating="9.2"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtBCDpzcYGzVv_jwVkRb-bMBvEz9yBmjnBUkB-UqbeO3GNqS92m-bosNQ&s=10"
          />

          <MovieCard
            title="The Mandalorian"
            year="2019"
            genre="Sci-Fi"
            rating="8.6"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAaj-_ovL5tyKpFUZfWIBvuZD4hLdeH1Z2nYShtcj3FcvDjAocSHOuDs&s=10"
          />

          <MovieCard
            title="Sherlock"
            year="2010"
            genre="Mystery"
            rating="9.1"
            image="https://image.tmdb.org/t/p/original/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg"
          />

          <MovieCard
            title="Friends"
            year="1994"
            genre="Comedy"
            rating="8.9"
            image="https://image.tmdb.org/t/p/original/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg"
          />

          <MovieCard
            title="The Office"
            year="2005"
            genre="Comedy"
            rating="9.0"
            image="https://image.tmdb.org/t/p/original/4h6b9hxZ0TbgWEpWXl9HpLQXJSi.jpg"
          />

          <MovieCard
            title="Money Heist"
            year="2017"
            genre="Crime"
            rating="8.2"
            image="https://image.tmdb.org/t/p/original/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"
          />

        </div>

      </main>


      <Footer />

    </>

  )
}

export default Series