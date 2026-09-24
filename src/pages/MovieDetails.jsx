import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CastCard from "../components/CastCard";
import SimilarMovieCard from "../components/SimilarMovieCard";
import ReviewCard from "../components/ReviewCard";

import movies from "../data/movies";

function MovieDetails() {

  const { id } = useParams();

  const movie = movies.find(
    (movie) => movie.id === Number(id)
  );

  if (!movie) {

    return (

      <>
        <Navbar />

        <main className="not-found">

          <h1>Movie Not Found</h1>

          <p>
            The movie you are looking for does not exist.
          </p>

        </main>

        <Footer />
      </>

    );
  }

  return (

    <>

      <Navbar />

      {/* MOVIE HERO */}

      <section
        className="movie-detail-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              #0e0b16 10%,
              #0e0b16ee 45%,
              #0e0b1680 75%,
              #0e0b16 100%
            ),
            url(${movie.backdrop})
          `
        }}
      >

        <div className="container movie-detail-container">

          <img
            className="detail-poster"
            src={movie.poster}
            alt={movie.title}
          />

          <div className="movie-main-info">

            <p className="detail-label">
              MOVIE
            </p>

            <h1>
              {movie.title}
            </h1>

            <p className="movie-description">
              {movie.description}
            </p>

            <div className="movie-meta">

              <span>{movie.year}</span>

              <span>•</span>

              <span>{movie.duration}</span>x

              <span>•</span>

              <span>{movie.certificate}</span>

            </div>

            <div className="movie-rating">

              <span className="big-star">
                ★
              </span>

              <strong>
                {movie.rating}
              </strong>

              <small>
                / 10
              </small>

            </div>

            <div className="genre-list">

              {movie.genre.map((genre) => (

                <span key={genre}>
                  {genre}
                </span>

              ))}

            </div>

           

            <div className="movie-buttons">

              <a
                href={movie.trailer}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                ▶ Watch Trailer
              </a>

              <button className="watchlist-btn">
                + Add to Watchlist
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* MOVIE INFORMATION */}

      <main className="section container">

        <section className="movie-info-section">

          <h2>
            Movie Details
          </h2>

          <div className="details-grid">

            <div>
              <span>Director</span>
              <strong>{movie.director}</strong>
            </div>

            <div>
              <span>Writers</span>
              <strong>
                {movie.writers.join(", ")}
              </strong>
            </div>

            <div>
              <span>Language</span>
              <strong>{movie.language}</strong>
            </div>

            <div>
              <span>Country</span>
              <strong>{movie.country}</strong>
            </div>

            <div>
              <span>Production</span>
              <strong>{movie.production}</strong>
            </div>

            <div>
              <span>Certificate</span>
              <strong>{movie.certificate}</strong>
            </div>

          </div>

        </section>


        {/* CAST */}

        <section className="detail-section">

          <div className="section-head">

            <div>

              <h2>
                Cast
              </h2>

              <p>
                Actors and characters
              </p>

            </div>

          </div>

          <div className="cast-grid">

            {movie.cast.map((person) => (

              <CastCard
                key={person.name}
                name={person.name}
                character={person.character}
                image={person.image}
              />

            ))}

          </div>

        </section>


        {/* TRAILER */}

        {/* <section className="detail-section">

          <h2>
            Official Trailer
          </h2>

          <div className="trailer-container">

            <iframe
              src={movie.trailer}
              title={`${movie.title} Trailer`}
              allowFullScreen
            ></iframe>

          </div>

        </section> */}


        {/* REVIEWS */}

        <section className="detail-section">

          <div className="section-head">

            <div>

              <h2>
                Reviews
              </h2>

              <p>
                What viewers are saying
              </p>

            </div>

          </div>

          <div className="reviews-grid">

            {movie.reviews.map((review, index) => (

              <ReviewCard
                key={index}
                user={review.user}
                rating={review.rating}
                comment={review.comment}
              />

            ))}

          </div>

        </section>


        {/* SIMILAR MOVIES */}

        <section className="detail-section">

          <div className="section-head">

            <div>

              <h2>
                Similar Movies
              </h2>

              <p>
                You may also like
              </p>

            </div>

          </div>

          <div className="similar-grid">

            {movie.similarMovies.map((similar) => (

              <SimilarMovieCard
                key={similar.id}
                id={similar.id}
                title={similar.title}
                year={similar.year}
                genre={similar.genre}
                rating={similar.rating}
                image={similar.image}
              />

            ))}

          </div>

        </section>

      </main>

      <Footer />

    </>

  );
}

export default MovieDetails;