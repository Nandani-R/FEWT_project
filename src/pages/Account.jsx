import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import ApiStatusBanner from '../components/ApiStatusBanner';
import { getDetails } from '../services/tmdb';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [watchlistIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bingehouse_watchlist') || '[]');
    } catch {
      return [];
    }
  });
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);

  useEffect(() => {
    if (activeTab === 'watchlist' && watchlistIds.length > 0) {
      let isMounted = true;
      async function loadWatchlist() {
        setLoadingWatchlist(true);
        try {
          const promises = watchlistIds.map((id) => getDetails(id).catch(() => null));
          const results = await Promise.all(promises);
          if (isMounted) {
            setWatchlistMovies(results.filter(Boolean));
          }
        } finally {
          if (isMounted) setLoadingWatchlist(false);
        }
      }
      loadWatchlist();
      return () => {
        isMounted = false;
      };
    }
  }, [activeTab, watchlistIds]);

  return (
    <>
      <Navbar />
      <ApiStatusBanner />

      <main className="section container">
        <div className="section-head">
          <div>
            <h1>My BingeHouse</h1>
            <p>Your account, watchlist and personalized viewing space.</p>
          </div>
        </div>

        <div className="account">
          <aside className="side">
            <button
              type="button"
              className={`side-link ${activeTab === 'profile' ? 'selected' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>

            <button
              type="button"
              className={`side-link ${activeTab === 'watchlist' ? 'selected' : ''}`}
              onClick={() => setActiveTab('watchlist')}
            >
              My Watchlist ({watchlistIds.length})
            </button>

            <button
              type="button"
              className={`side-link ${activeTab === 'preferences' ? 'selected' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </aside>

          <section className="account-card" style={{ flex: 1 }}>
            {activeTab === 'profile' && (
              <div>
                <h2>BingeHouse Member</h2>
                <p style={{ color: 'var(--muted)', marginTop: '8px' }}>member@bingehouse.com</p>
                <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <p><strong>Membership Status:</strong> Premium Active</p>
                  <p style={{ marginTop: '8px' }}><strong>Stream Quality:</strong> Ultra HD / 4K</p>
                  <p style={{ marginTop: '8px' }}><strong>Saved Titles:</strong> {watchlistIds.length} in Watchlist</p>
                </div>
              </div>
            )}

            {activeTab === 'watchlist' && (
              <div>
                <h2>My Watchlist</h2>
                <p style={{ color: 'var(--muted)', marginTop: '6px', marginBottom: '20px' }}>
                  Titles you've marked to binge later.
                </p>

                {loadingWatchlist ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your saved titles...</p>
                  </div>
                ) : watchlistMovies.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 0' }}>
                    <p style={{ color: 'var(--muted)' }}>Your watchlist is empty.</p>
                    <Link to="/movies" className="btn" style={{ marginTop: '15px' }}>
                      Browse Movies
                    </Link>
                  </div>
                ) : (
                  <div className="grid">
                    {watchlistMovies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        genre={Array.isArray(movie.genre) ? movie.genre[0] : movie.genre}
                        rating={movie.rating}
                        image={movie.poster || movie.image}
                        type={movie.type}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2>Preferences</h2>
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" defaultChecked />
                    Autoplay Next Episode
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" defaultChecked />
                    High Definition (HD / 4K) Streaming
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" defaultChecked />
                    Show TMDB Ratings
                  </label>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Account;