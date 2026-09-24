import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Signup() {

  return (

    <>

      <Navbar />

      <main className="auth">

        <div className="auth-box">

          <h1>
            Create your BingeHouse
          </h1>

          <p>
            Create your account.
          </p>


          <label>
            Name
          </label>

          <input
            className="input"
            placeholder="Your name"
          />


          <label>
            Email
          </label>

          <input
            className="input"
            type="email"
            placeholder="Email"
          />


          <label>
            Password
          </label>

          <input
            className="input"
            type="password"
            placeholder="Password"
          />


          <button className="btn">
            Create Account
          </button>

        </div>

      </main>

      <Footer />

    </>

  )
}

export default Signup