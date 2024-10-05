import { useState} from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { uuidv7 } from "uuidv7";
import { fetchBoulders } from '../util/services';

/* 
Disclamer: This is a edited copy of the code from the React Leaflet documentation.  
*/

// for pre-configured markers
//const marker_arr = await getBoulderLocations();
const marker_arr = await fetchBoulders();

export default function BoulderMarker() {
  const [, setPosition] = useState(null);
  
  useMapEvents({
    click(e) {
      console.log(e.latlng);
      setPosition(e.latlng);
    },
  })

  return marker_arr.map((pos) =>{
    const identifier = uuidv7();
    const latlng = {"lat": pos.lat, "lng": pos.lng};
    console.log(latlng);
    return(
      <Marker position={latlng} key={identifier}>
          <Popup>You are here</Popup>
      </Marker>
    );
  });
}