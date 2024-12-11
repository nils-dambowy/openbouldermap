import { useMap} from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from "leaflet";
import styled from 'styled-components';

const StyledButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10000;
    background-color: white;
    border-radius: 1px;
    /* mobile screen settings*/
    @media screen and (max-width: 500px) {
        top: 60px;
        right: 10px;
    }
`;

export default function LocateButton() {
    const btnRef = useRef(null);
    const map = useMap();

    /* prevents the button from triggering the map click event */
    useEffect(() => {
      L.DomEvent.disableClickPropagation(btnRef.current);
    });

    const handleButtonClick = (e) => {
      e.stopPropagation(); 
      L.DomEvent.stopPropagation(e);
      map.locate().on("locationfound", function (e) {
        console.log("location found");
        map.flyTo(e.latlng, map.getZoom());
      });
      map.on('locationerror', function(e) {
        console.log(e);
        alert(e.message);
      });
      
    };

    return(
        <StyledButton 
          type="button"
          ref={btnRef}
          className="edit-location-button"
          onClick={handleButtonClick}
          >
          Set to current location
        </StyledButton>
    )
}