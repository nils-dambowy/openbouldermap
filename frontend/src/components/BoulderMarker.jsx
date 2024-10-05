import { useState, useEffect } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { uuidv7 } from "uuidv7";
import { fetchBoulders } from '../util/services';

export default function BoulderMarker() {
  const [, setPosition] = useState(null);
  const [markerArr, setMarkerArr] = useState([]);

  useEffect(() => {
    const getBoulders = async () => {
      try {
        const boulderData = await fetchBoulders(); 
        setMarkerArr(boulderData); 
        console.log('Fetched boulders:', boulderData);
      } catch (error) {
        console.error('Error fetching boulders:', error);
      }
    };

    getBoulders(); 
  }, []); 

  
  useMapEvents({
    click(e) {
      console.log(e.latlng);
      setPosition(e.latlng);
    },
  })

  return markerArr.map((pos) =>{
    console.log("Entering map");
    console.log("size of marker_arr: ", markerArr.length);
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