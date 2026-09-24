import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {

  return (

    <>

      <Navbar />

      <header className="page-header">

        <div className="container">

          <h1>
            About BingeHouse
          </h1>

          <p>
            A movie and web-series
            discovery website.
          </p>

        </div>

      </header>


      <main className="section container">

        <div className="about-grid">

          <div className="box">

            <h2>
              Why BingeHouse?
            </h2>

            <p>
              BingeHouse is designed around
              a simple idea: discovering something
              to watch should feel fun and effortless.
            </p>

          </div>


          <div className="box">

            <h2>
              Built for the future
            </h2>

            <p>
              This project can later be extended
              with APIs, databases and other
              React features.
            </p>

          </div>

        </div>

      </main>


      <Footer />

    </>

  )
}

export default About