import { useState, useRef, useEffect } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import L from "leaflet";
import { addBoulder } from '../util/services';

export default function BoulderPopup() {
  const map = useMap();
  const [pos, setPosition] = useState(null);
  const [tempMarkerObj, setTempMarker] = useState({});
  const [popUpopen, setPopup] = useState(false);
  const [boulderDescription, setDescription] = useState('');
  const [boulderName, setName] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
  if(popUpopen){
      // only disable click propagation if pop up us present
      L.DomEvent.disableClickPropagation(divRef.current);
    }
  });
      
  useMapEvents({
    click(e) {
     if(!popUpopen){
        setTempMarker(L.marker(e.latlng).addTo(map));
        setPosition(e.latlng);
        setPopup(true);
     }
    },
  })

return(<>
    { popUpopen? 
    <div className="boulder-popup" ref={divRef}>
        <h1>Name: </h1> <input type="text" placeholder={Name} onChange={(e) => setName(e.target.value)}/>
        <h2>Description: </h2> <input type="text" placeholder={description} onChange={(e) => setDescription(e.target.value)}/>
        <div className="boulder-popup-buttons">
        <button onClick={() => {
                                 map.removeLayer(tempMarkerObj);
                                 setPopup(false);
        }}>Close</button>

        <button onClick={() => {
                                 L.marker(pos).bindPopup(boulderDescription).addTo(map);
                                 addBoulder({description: boulderDescription, lat: pos.lat, lng: pos.lng, name: boulderName});
                                 setPopup(false);
        }}>Confirm</button>
        </div>
    </div> 
    : null}
    </>
  );
}