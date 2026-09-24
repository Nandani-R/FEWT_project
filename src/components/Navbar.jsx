import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    } else {
      navigate('/search');
    }
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div>
      <nav className="navbar">
        <Link className="logo" to="/">
          <span className="logo-mark"></span>
          Binge<b>House</b>
        </Link>

        <div
          className="menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation"
        >
          ☰
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
          <li>
            <Link className={isActive('/')} to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link className={isActive('/movies')} to="/movies" onClick={() => setMobileMenuOpen(false)}>
              Movies
            </Link>
          </li>
          <li>
            <Link className={isActive('/series')} to="/series" onClick={() => setMobileMenuOpen(false)}>
              Web Series
            </Link>
          </li>
          <li>
            <Link className={isActive('/genres')} to="/genres" onClick={() => setMobileMenuOpen(false)}>
              Genres
            </Link>
          </li>
          <li>
            <Link className={isActive('/about')} to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>

        <div className="nav-tools">
          <form className="search-mini" onSubmit={handleSearchSubmit}>
            <input
              name="q"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" aria-label="Submit Search">
              ⌕
            </button>
          </form>

          <Link className="signin" to="/login">
            Sign In
          </Link>

          <Link className="profile" to="/account" aria-label="Account">
            ◉
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;