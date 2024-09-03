import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';

/* 
Disclamer: This is a edited copy of the code from the React Leaflet documentation.  
*/

export default function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      //map.locate()
      //const { lat, lng } = e.latlng;
      // this allows adds another marker to the map
      // however, it works without the need of the component
      // --> I still need to revise t
      //L.marker([lat, lng], { icon }).addTo(map);
      setPosition(e.latlng)
    },
  })
  
  return position === null ? null : (
    <Marker position={position}>
        <Popup>You are here</Popup>
    </Marker>
  )
}