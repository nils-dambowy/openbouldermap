import { useEffect, useRef} from 'react';
import "../App.css";
import L from "leaflet";
import PropTypes from 'prop-types';

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
        <button
        type="button"
        ref={btnRef}
        className="edit-layer-button"
        onClick={handleButtonClick}
         >
        Change map
      </button>
    )
}