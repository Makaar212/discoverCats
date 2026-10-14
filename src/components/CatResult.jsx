function CatResult({ cat, onBan }) {
  if (!cat) return null;

  return (
    <div className="catResult">
      <h2>{cat.breed}</h2>
      <div className="attributes">
        <button onClick={() => onBan(cat.breed)}>{cat.breed}</button>
        <button onClick={() => onBan(cat.origin)}>{cat.origin}</button>
        <button onClick={() => onBan(cat.lifeSpan)}>{cat.lifeSpan}</button>
      </div>
      <img src={cat.image} alt={cat.breed} width="300" />
    </div>
  );
}

export default CatResult;
