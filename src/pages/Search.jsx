import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Search() {

  return (

    <>

      <Navbar />

      <main className="section container">

        <div className="page-header">

          <h1>
            Search
          </h1>

          <p>
            Search for movies and web series.
          </p>

        </div>


        <form className="auth-box">

          <input
            className="input"
            placeholder="Search..."
          />

          <button className="btn">
            Search
          </button>

        </form>

      </main>


      <Footer />

    </>

  )
}

export default Search