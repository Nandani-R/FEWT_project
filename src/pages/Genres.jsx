import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GenreCard from '../components/GenreCard';
import ApiStatusBanner from '../components/ApiStatusBanner';

const GENRE_LIST = [
  {
    id: 28,
    title: 'Action',
    description: 'Fast, bold and impossible to pause.',
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  {
    id: 10749,
    title: 'Romance',
    description: 'Stories with heart.',
    image: 'https://image.tmdb.org/t/p/original/8MFJ4aAr85B5lVCecxGSd9iX6FX.jpg'
  },
  {
    id: 878,
    title: 'Sci-Fi',
    description: 'Worlds beyond the ordinary.',
    image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
  },
  {
    id: 53,
    title: 'Thriller',
    description: 'Keep guessing until the end.',
    image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
  },
  {
    id: 18,
    title: 'Drama',
    description: 'Characters and stories that stay with you.',
    image: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'
  },
  {
    id: 35,
    title: 'Comedy',
    description: 'Something lighter for tonight.',
    image: 'https://image.tmdb.org/t/p/original/irUIeUE9yFyvRIeS24duTLnCxAz.jpg'
  },
  {
    id: 27,
    title: 'Horror',
    description: 'Chills, thrills and jump scares.',
    image: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'
  },
  {
    id: 16,
    title: 'Animation',
    description: 'Vibrant imagination for all ages.',
    image: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg'
  },
  {
    id: 80,
    title: 'Crime',
    description: 'Mysteries, heists and dark alleys.',
    image: 'https://image.tmdb.org/t/p/w500/h7thkR45Z9Yg6zJecOqMsm2p8mJ.jpg'
  }
];

function Genres() {
  return (
    <>
      <Navbar />
      <ApiStatusBanner />

      <header className="page-header">
        <div className="container">
          <h1>Pick a Mood</h1>
          <p>
            Don't know what to watch? Start with a feeling and discover top movies.
          </p>
        </div>
      </header>

      <main className="section container">
        <div className="genre-grid">
          {GENRE_LIST.map((genre) => (
            <GenreCard
              key={genre.id}
              genreId={genre.id}
              title={genre.title}
              description={genre.description}
              image={genre.image}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Genres;