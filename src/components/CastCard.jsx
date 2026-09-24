function CastCard({ name, character, image }) {
  const fallbackImg = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80";

  return (
    <div className="cast-card">
      <img
        src={image || fallbackImg}
        alt={name}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
      />

      <div className="cast-info">
        <h3>{name}</h3>
        <p>{character}</p>
      </div>
    </div>
  );
}

export default CastCard;