function CatResult({ cat }) {
  if (!cat) return null;

  return (
    <div className="catResult">
      <h2>{cat.breed}</h2>
      <div className="attributes">
        <button>{cat.breed}</button>
        <button>{cat.origin}</button>
        <button>{cat.lifeSpan} years</button>
      </div>
      <img src={cat.image} alt={cat.breed} width="300" />
    </div>
  );
}

export default CatResult;
