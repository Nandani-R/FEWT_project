import { Link } from "react-router-dom";

function MovieCard({
  id,
  title,
  year,
  genre,
  rating,
  image,
  type = "movie"
}) {
  const detailUrl = type === "tv" ? `/movie/${id}?type=tv` : `/movie/${id}`;
  const displayImage = image || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";

  return (
    <Link
      to={detailUrl}
      className="movie-card-link"
    >
      <article className="card">
        <div
          className="poster"
          style={{
            backgroundImage: `url("${displayImage}")`
          }}
        >
          {type === "tv" && (
            <span className="card-badge">TV</span>
          )}
        </div>

        <div className="card-body">
          <h3>{title}</h3>

          <div className="meta">
            {year || "N/A"} {genre ? `· ${genre}` : ""}
          </div>

          <div className="rating">
            ★ {rating ? `${rating}/10` : "N/A"}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;