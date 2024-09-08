import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { uploadBoulders, getBoulderLocations } from '../util/client';

/* 
Disclamer: This is a edited copy of the code from the React Leaflet documentation.  
*/

// for pre-configured markers
const marker_arr = await getBoulderLocations();

export default function LocationMarker() {

  const [pos, setPosition] = useState(null)
  useMapEvents({
    click(e) {
      //map.locate()
      const p = e.latlng;
      // store boulder
      uploadBoulders("Boulder", String(p.lat) + "," + String(p.lng));
      // 
      marker_arr.push(p);
      console.log(e.latlng);
      setPosition(e.latlng);
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