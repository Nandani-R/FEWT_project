import { Link } from "react-router-dom";

function SimilarMovieCard({
  id,
  title,
  year,
  rating,
  genre,
  image
}) {

  return (

    <Link
      to={`/movie/${id}`}
      className="similar-card"
    >

      <img
        src={image}
        alt={title}
      />

      <div className="similar-info">

        <h3>{title}</h3>

        <p>
          {year} · {genre}
        </p>

        <span>
          ★ {rating}
        </span>

      </div>

    </Link>

  );
}

export default SimilarMovieCard;