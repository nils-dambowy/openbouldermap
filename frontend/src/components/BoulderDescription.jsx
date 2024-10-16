import BoulderIcon from '../assets/boulder-icon.png';
import styled from 'styled-components';
import "../App.css";

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  margin: auto;
  display: block;
`;

export default function BoulderDescription({name, description, difficulty}) {
  return (
    <div>
      <h1>{name}</h1>
      <StyledImg src={BoulderIcon} alt="boulder-icon" />
      <p>Description: {description}</p>
      <p>Difficulty: {difficulty}</p>
    </div>
  );
}