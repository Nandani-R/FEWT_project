import { Link } from "react-router-dom";

function SimilarMovieCard({
  id,
  title,
  year,
  rating,
  genre,
  image,
  type = "movie"
}) {
  const detailUrl = type === "tv" ? `/movie/${id}?type=tv` : `/movie/${id}`;
  const displayImage = image || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";

  return (
    <Link
      to={detailUrl}
      className="similar-card"
    >
      <img
        src={displayImage}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";
        }}
      />

      <div className="similar-info">
        <h3>{title}</h3>

        <p>
          {year || "N/A"} {genre ? `· ${genre}` : ""}
        </p>

        <span>
          ★ {rating}
        </span>
      </div>
    </Link>
  );
}

export default SimilarMovieCard;