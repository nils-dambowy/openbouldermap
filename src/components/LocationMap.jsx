import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import "../App.css";

export default function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
          map.locate()
          //const { lat, lng } = e.latlng;
          // this allows adds another marker to the map
          // however, it works without the need of the component
          // --> I still need to revise t
          //L.marker([lat, lng], { icon }).addTo(map);
        },
        locationfound(e) {
            setPosition(e.latlng)
            //map.flyTo(e.latlng, map.getZoom())
          },
      })

    return(
        <button
        type="button"
        className="edit-location-button"
        onClick={() => {
            map.flyTo(position);
            }}
         >
        Set to current location
      </button>
    )
}