function CatResult({ cat }) {
  if (!cat) return null;

  const breed = cat.breeds[0];

  return (
    <div className="catResult">
      <h2>{breed.name}</h2>
      <img src={cat.url} alt={breed.name} width="300" />
      <div className="attributes">
        <button>{breed.name}</button>
        <button>{breed.origin}</button>
        <button>{breed.life_span} years</button>
      </div>
    </div>
  );
}

export default CatResult;
