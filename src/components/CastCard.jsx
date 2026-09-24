function CastCard({ name, character, image }) {

  return (

    <div className="cast-card">

      <img
        src={image}
        alt={name}
      />

      <div className="cast-info">

        <h3>{name}</h3>

        <p>{character}</p>

      </div>

    </div>

  );
}

export default CastCard;