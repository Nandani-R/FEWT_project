import { Link } from "react-router-dom";

function MovieCard({
  id,
  title,
  year,
  genre,
  rating,
  image
}) {

  return (

    <Link
      to={`/movie/${id}`}
      className="movie-card-link"
    >

      <article className="card">

        <div
          className="poster"
          style={{
            backgroundImage: `url(${image})`
          }}
        >
        </div>

        <div className="card-body">

          <h3>
            {title}
          </h3>

          <div className="meta">
            {year} · {genre}
          </div>

          <div className="rating">
            ★ {rating}/10
          </div>

        </div>

      </article>

    </Link>

  );
}

export default MovieCard;