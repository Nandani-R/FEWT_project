import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import ApiStatusBanner from '../components/ApiStatusBanner';
import { getTrending } from '../services/tmdb';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTrending() {
      try {
        setLoading(true);
        const data = await getTrending('movie', 'day');
        if (isMounted) {
          setMovies(data);
          if (data && data.length > 0) {
            setFeatured(data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load trending movies', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTrending();
    return () => {
      isMounted = false;
    };
  }, []);

  const heroBackdrop = featured?.backdrop || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80';

  return (
    <>
      <Navbar />
      <ApiStatusBanner />

      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 40%, rgba(120, 63, 201, 0.35), transparent 35%),
            linear-gradient(90deg, #0e0b16 15%, rgba(14, 11, 22, 0.88) 55%, rgba(14, 11, 22, 0.3) 100%),
            url("${heroBackdrop}")
          `
        }}
      >
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">MOVIES · SERIES · STORIES</div>

            <h1>
              Find something worth
              <span> bingeing.</span>
            </h1>

            <p>
              {featured?.overview
                ? featured.overview.length > 150
                  ? `${featured.overview.slice(0, 150)}...`
                  : featured.overview
                : 'BingeHouse is your personal corner for discovering movies and web series.'}
            </p>

            {featured && (
              <div style={{ marginBottom: '25px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link to={`/movie/${featured.id}`} className="btn">
                  ▶ View Featured ({featured.title})
                </Link>
              </div>
            )}
          </div>

          {/* EXPLORE BUTTONS */}
          <section className="explore">
            <Link to="/movies" className="explore-btn">
              Explore Movies
            </Link>

            <Link to="/series" className="explore-btn">
              Explore Web Series
            </Link>
          </section>
        </div>
      </section>

      {/* TONIGHT'S PICKS */}
      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Tonight's Picks</h2>
            <p>A fresh, trending mix updated live from TMDB.</p>
          </div>
          <Link to="/movies" style={{ color: 'var(--pink)', fontWeight: 600 }}>
            View all movies →
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching movies from TMDB...</p>
          </div>
        ) : (
          <div className="grid">
            {movies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                genre={movie.genre}
                rating={movie.rating}
                image={movie.image}
                type="movie"
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Home;