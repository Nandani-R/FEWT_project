import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Account() {

  return (

    <>

      <Navbar />

      <main className="section container">

        <div className="section-head">

          <div>

            <h1>
              My BingeHouse
            </h1>

            <p>
              Your account and viewing space.
            </p>

          </div>

        </div>


        <div className="account">

          <aside className="side">

            <a className="selected">
              Profile
            </a>

            <a>
              My List
            </a>

            <a>
              Watch History
            </a>

            <a>
              Preferences
            </a>

          </aside>


          <section className="account-card">

            <h2>
              BingeHouse Member
            </h2>

            <p>
              member@bingehouse.com
            </p>

          </section>

        </div>

      </main>


      <Footer />

    </>

  )
}

export default Account