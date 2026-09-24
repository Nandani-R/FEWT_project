import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import ApiStatusBanner from '../components/ApiStatusBanner';
import { getMovies, MOVIE_GENRES } from '../services/tmdb';

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlGenreId = searchParams.get('genre');
  const selectedGenre = urlGenreId ? Number(urlGenreId) : 0;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadMovies() {
      try {
        setLoading(true);
        const data = await getMovies({
          genreId: selectedGenre,
          category: 'popular'
        });
        if (isMounted) {
          setMovies(data);
        }
      } catch (err) {
        console.error('Failed to load movies', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMovies();
    return () => {
      isMounted = false;
    };
  }, [selectedGenre]);

  const handleGenreClick = (genreId) => {
    if (genreId === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ genre: String(genreId) });
    }
  };

  return (
    <>
      <Navbar />
      <ApiStatusBanner />

      <header className="page-header">
        <div className="container">
          <h1>Movies</h1>
          <p>Stories made for the big screen, ready for your screen.</p>
        </div>
      </header>

      <main className="section container">
        <div className="filters" role="tablist" aria-label="Genre filters">
          {MOVIE_GENRES.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`filter-btn ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => handleGenreClick(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading movies from TMDB...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="not-found" style={{ padding: '40px 0' }}>
            <h2>No movies found</h2>
            <p>Try selecting a different genre or clearing filters.</p>
          </div>
        ) : (
          <div className="grid">
            {movies.map((movie) => (
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
      </main>

      <Footer />
    </>
  );
}

export default Movies;