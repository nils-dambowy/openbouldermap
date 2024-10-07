import BoulderIcon from '../assets/boulder-icon.png';
import "../App.css";


export default function BoulderDescription({name, description, difficulty}) {
  return (
    <div className="BoulderDescription">
      <h1>{name}</h1>
      <img src={BoulderIcon} alt="boulder-icon" className="boulder-icon" />
      <p>Description: {description}</p>
      <p>Difficulty: {difficulty}</p>
    </div>
  );
}