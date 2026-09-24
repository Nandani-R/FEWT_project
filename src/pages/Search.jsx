import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import ApiStatusBanner from '../components/ApiStatusBanner';
import { searchTitles } from '../services/tmdb';

const POPULAR_SEARCHES = ['Inception', 'Avengers', 'Stranger Things', 'Interstellar', 'Batman', 'Spiderman', 'Harry Potter'];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [inputQuery, setInputQuery] = useState(urlQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasSearched = Boolean(urlQuery.trim());

  useEffect(() => {
    let isMounted = true;
    if (!urlQuery.trim()) {
      return;
    }

    async function executeSearch() {
      setLoading(true);
      try {
        const data = await searchTitles(urlQuery.trim());
        if (isMounted) {
          setResults(data);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    executeSearch();

    return () => {
      isMounted = false;
    };
  }, [urlQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      setSearchParams({ q: inputQuery.trim() });
    }
  };

  const handleTagClick = (tag) => {
    setInputQuery(tag);
    setSearchParams({ q: tag });
  };

  return (
    <>
      <Navbar />
      <ApiStatusBanner />

      <main className="section container">
        <div className="page-header" style={{ padding: '30px 0 20px' }}>
          <h1>Search</h1>
          <p>Find your favorite movies and web series by title or keywords.</p>
        </div>

        <form className="auth-box search-form-box" onSubmit={handleFormSubmit} style={{ margin: '0 auto 30px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              className="input"
              placeholder="Search for movies, series..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              style={{ flex: 1 }}
              autoFocus
            />
            <button type="submit" className="btn" style={{ margin: 0, whiteSpace: 'nowrap' }}>
              Search
            </button>
          </div>

          <div className="search-tags" style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--muted)', alignSelf: 'center' }}>Popular:</span>
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                type="button"
                className="search-tag-btn"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Searching TMDB database...</p>
          </div>
        )}

        {!loading && hasSearched && (
          <section className="search-results-section">
            <div className="section-head">
              <div>
                <h2>Results {urlQuery ? `for "${urlQuery}"` : ''}</h2>
                <p>Found {results.length} title{results.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="not-found" style={{ padding: '40px 0', textAlign: 'center' }}>
                <h3>No results found</h3>
                <p>Try searching for a different movie, character, or series.</p>
              </div>
            ) : (
              <div className="grid">
                {results.map((item) => (
                  <MovieCard
                    key={`${item.type}-${item.id}`}
                    id={item.id}
                    title={item.title}
                    year={item.year}
                    genre={item.genre}
                    rating={item.rating}
                    image={item.image}
                    type={item.type}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Search;