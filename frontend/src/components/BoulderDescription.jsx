export default function BoulderDescription({name, description}) {
  return (
    <div className="BoulderDescription">
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}