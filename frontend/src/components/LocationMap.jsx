import { useMap} from 'react-leaflet';
import { useEffect, useRef } from 'react';
import "../App.css";
import L from "leaflet";

export default function LocationMarker() {
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
        map.flyTo(e.latlng, map.getZoom());
      });
    };

    return(
        <button
        type="button"
        ref={btnRef}
        className="edit-location-button"
        onClick={handleButtonClick}
         >
        Set to current location
      </button>
    )
}