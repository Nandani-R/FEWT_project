
function GenreCard({title,description,image}) {

  return (

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

  )
}

export default GenreCard