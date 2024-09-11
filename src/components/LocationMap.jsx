import { useMap } from 'react-leaflet';
import "../App.css";

export default function LocationMarker() {
    const map = useMap();

    return(
        <button
        type="button"
        className="edit-location-button"
        onClick={() => {
          map.locate().on("locationfound", function (e) {
            map.flyTo(e.latlng, map.getZoom());
          });
        }}
         >
        Set to current location
      </button>
    )
}