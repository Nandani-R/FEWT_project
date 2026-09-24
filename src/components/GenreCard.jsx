import { Link } from 'react-router-dom';

function GenreCard({ title, description, image, genreId }) {
  const targetUrl = genreId
    ? `/movies?genre=${genreId}&name=${encodeURIComponent(title)}`
    : `/movies?searchGenre=${encodeURIComponent(title)}`;

  return (
    <Link
      to={targetUrl}
      className="genre-card-link"
    >
      <div
        className="genre"
        style={{
          backgroundImage: `url(${image})`
        }}
      >
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default GenreCard;