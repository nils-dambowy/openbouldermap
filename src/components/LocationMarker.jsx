import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';

/* 
Disclamer: This is a edited copy of the code from the React Leaflet documentation.  
*/
const marker_arr = [];
export default function LocationMarker() {

 

  const [pos, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      //map.locate()
      const p = e.latlng;
      // this allows adds another marker to the map
      // however, it works without the need of the component
      // --> I still need to revise t
      //L.marker([lat, lng], { icon }).addTo(map);
      marker_arr.push(p);
      setPosition(e.latlng);
      console.log(p);
      console.log(marker_arr);
      console.log(e.latlng);
    },
  })
  
  return marker_arr.map((pos) =>{
    return(
      <Marker position={pos} key="marker">
          <Popup>You are here</Popup>
      </Marker>
    );
  });
}