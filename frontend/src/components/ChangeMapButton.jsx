import { useEffect, useRef} from 'react';
import L from "leaflet";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 10000;
    background-color: white;
    border-radius: 0px;
    /* mobile screen settings*/
    @media screen and (max-width: 500px) {
        top: 100px;
        right: 10px;
    }
`;

export default function ChangeMapButton({URL, changeMapFunction}) {

    ChangeMapButton.propTypes = {
      URL: PropTypes.string.isRequired,
      changeMapFunction: PropTypes.func.isRequired,
    };
    
    const btnRef = useRef(null);

    /* prevents the button from triggering the map click event */
    useEffect(() => {
      L.DomEvent.disableClickPropagation(btnRef.current);
    });

    const handleButtonClick = () => {
      // there is definitely a better way to do this
      // but this works for now
      if (URL === "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png") {
        changeMapFunction("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");
      } else {
        changeMapFunction("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
      }
    };

    return(
        <StyledButton
        type="button"
        ref={btnRef}
        className="edit-layer-button"
        onClick={handleButtonClick}
         >Change Map</StyledButton>
    )
}