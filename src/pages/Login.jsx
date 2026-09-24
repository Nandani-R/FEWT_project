import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {

  return (

    <>

      <Navbar />

      <main className="auth">

        <div className="auth-box">

          <h1>
            Welcome to BingeHouse
          </h1>

          <p>
            Sign in to your account.
          </p>


          <label>
            Email
          </label>

          <input
            className="input"
            type="email"
            placeholder="you@example.com"
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
            Sign In
          </button>

        </div>

      </main>

      <Footer />

    </>

  )
}

export default Login