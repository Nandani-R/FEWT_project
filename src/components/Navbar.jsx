import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav className="navbar">

            <Link className="logo" to="/">
                <span className="logo-mark"></span>
                Binge<b>House</b>
            </Link>

            <div className="menu">☰</div>

            <ul className="nav-links">

                <li>
                    <Link className="active" to="/">
                        Home
                    </Link>
                </li>

                <li>
                    <Link className="" to="/movies">
                        Movies
                    </Link>
                </li>

                <li>
                    <Link className="" to="/series">
                        Web Series
                    </Link>
                </li>

                <li>
                    <Link className="" to="/genres">
                        Genres
                    </Link>
                </li>

                <li>
                    <Link className="" to="/about">
                        About
                    </Link>
                </li>

            </ul>

            <div className="nav-tools">

                <form className="search-mini">
                    <input
                        name="q"
                        placeholder="Search..."
                    />

                    <Link to="/search">
                        <button type="button">⌕</button>
                    </Link>

                </form>

                <Link className="signin" to="/login">
                    Sign In
                </Link>

                <Link className="profile" to="/account">
                    ◉
                </Link>

            </div>

        </nav>
    </div>
  )
}

export default Navbar