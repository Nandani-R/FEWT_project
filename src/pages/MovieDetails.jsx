import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CastCard from '../components/CastCard';
import SimilarMovieCard from '../components/SimilarMovieCard';
import ReviewCard from '../components/ReviewCard';
import ApiStatusBanner from '../components/ApiStatusBanner';
import { getDetails } from '../services/tmdb';

function MovieDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get('type') || 'movie';

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bingehouse_watchlist') || '[]');
      return saved.includes(Number(id));
    } catch {
      return false;
    }
  });
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const toggleWatchlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('bingehouse_watchlist') || '[]');
      const numericId = Number(id);
      let updated;
      if (saved.includes(numericId)) {
        updated = saved.filter((item) => item !== numericId);
        setInWatchlist(false);
      } else {
        updated = [...saved, numericId];
        setInWatchlist(true);
      }
      localStorage.setItem('bingehouse_watchlist', JSON.stringify(updated));
    } catch {
      setInWatchlist(!inWatchlist);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const data = await getDetails(id, mediaType);
        if (isMounted) {
          setMovie(data);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id, mediaType]);

  if (loading) {
    return (
      <>
        <Navbar />
        <ApiStatusBanner />
        <main className="section container">
          <div className="loading-state" style={{ minHeight: '50vh' }}>
            <div className="spinner"></div>
            <p>Loading title details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <ApiStatusBanner />
        <main className="not-found" style={{ minHeight: '60vh', textAlign: 'center', padding: '100px 20px' }}>
          <h1>Title Not Found</h1>
          <p>The movie or series you are looking for does not exist or could not be loaded.</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/movies" className="btn">
              ← Browse Movies
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ApiStatusBanner />

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
            url("${movie.backdrop}")
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
              {movie.type === 'tv' ? 'WEB SERIES' : 'MOVIE'}
            </p>

            <h1>{movie.title}</h1>

            <p className="movie-description">
              {movie.description}
            </p>

            <div className="movie-meta">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <span>{movie.certificate}</span>
            </div>

            <div className="movie-rating">
              <span className="big-star">★</span>
              <strong>{movie.rating}</strong>
              <small>/ 10</small>
            </div>

            <div className="genre-list">
              {Array.isArray(movie.genre) &&
                movie.genre.map((genreName) => (
                  <span key={genreName}>{genreName}</span>
                ))}
            </div>

            <div className="movie-buttons">
              {movie.trailer ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowTrailerModal(true)}
                >
                  ▶ Watch Trailer
                </button>
              ) : null}

              <button
                type="button"
                className={`watchlist-btn ${inWatchlist ? 'watchlist-active' : ''}`}
                onClick={toggleWatchlist}
              >
                {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER MODAL */}
      {showTrailerModal && (
        <div className="trailer-modal-overlay" onClick={() => setShowTrailerModal(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="trailer-modal-close"
              onClick={() => setShowTrailerModal(false)}
            >
              ✕
            </button>
            <div className="trailer-iframe-wrapper">
              <iframe
                src={`${movie.trailer}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* MOVIE INFORMATION */}
      <main className="section container">
        <section className="movie-info-section">
          <h2>Details &amp; Info</h2>

          <div className="details-grid">
            <div>
              <span>Director / Creator</span>
              <strong>{movie.director || 'N/A'}</strong>
            </div>

            <div>
              <span>Writers</span>
              <strong>
                {Array.isArray(movie.writers) && movie.writers.length > 0
                  ? movie.writers.join(', ')
                  : 'N/A'}
              </strong>
            </div>

            <div>
              <span>Language</span>
              <strong>{movie.language || 'English'}</strong>
            </div>

            <div>
              <span>Country</span>
              <strong>{movie.country || 'USA'}</strong>
            </div>

            <div>
              <span>Production</span>
              <strong>{movie.production || 'N/A'}</strong>
            </div>

            <div>
              <span>Certificate</span>
              <strong>{movie.certificate || 'PG-13'}</strong>
            </div>
          </div>
        </section>

        {/* CAST */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>Top Cast</h2>
                <p>Actors and characters</p>
              </div>
            </div>

            <div className="cast-grid">
              {movie.cast.map((person, idx) => (
                <CastCard
                  key={`${person.name}-${idx}`}
                  name={person.name}
                  character={person.character}
                  image={person.image}
                />
              ))}
            </div>
          </section>
        )}

        {/* REVIEWS */}
        {movie.reviews && movie.reviews.length > 0 && (
          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>Viewer Reviews</h2>
                <p>What the community is saying</p>
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
        )}

        {/* SIMILAR TITLES */}
        {movie.similarMovies && movie.similarMovies.length > 0 && (
          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>You May Also Like</h2>
                <p>Recommended titles based on this pick</p>
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
                  type={movie.type}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MovieDetails;