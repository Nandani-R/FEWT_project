import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import ApiStatusBanner from '../components/ApiStatusBanner';
import { getSeries, TV_GENRES } from '../services/tmdb';

function Series() {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadSeries() {
      try {
        setLoading(true);
        const data = await getSeries({
          genreId: selectedGenre,
          category: 'popular'
        });
        if (isMounted) {
          setSeriesList(data);
        }
      } catch (err) {
        console.error('Failed to load web series', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadSeries();
    return () => {
      isMounted = false;
    };
  }, [selectedGenre]);

  return (
    <>
      <Navbar />
      <ApiStatusBanner />

      <header className="page-header">
        <div className="container">
          <h1>Web Series</h1>
          <p>Long-form stories for those "just one more episode" nights.</p>
        </div>
      </header>

      <main className="section container">
        <div className="filters" role="tablist" aria-label="Series genre filters">
          {TV_GENRES.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`filter-btn ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading TV series from TMDB...</p>
          </div>
        ) : seriesList.length === 0 ? (
          <div className="not-found" style={{ padding: '40px 0' }}>
            <h2>No series found</h2>
            <p>Try selecting a different genre or clearing filters.</p>
          </div>
        ) : (
          <div className="grid">
            {seriesList.map((series) => (
              <MovieCard
                key={series.id}
                id={series.id}
                title={series.title}
                year={series.year}
                genre={series.genre}
                rating={series.rating}
                image={series.image}
                type="tv"
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Series;