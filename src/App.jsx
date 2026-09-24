// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Series from './pages/Series'
import Genres from './pages/Genres'
import About from './pages/About'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Search from './pages/Search'


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/series"
          element={<Series />}
        />

        <Route
          path="/genres"
          element={<Genres />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App