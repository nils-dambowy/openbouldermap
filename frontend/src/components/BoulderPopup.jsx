import { useState, useRef, useEffect } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import L from "leaflet";
import { addBoulder } from '../util/services';
import BoulderDescription from './BoulderDescription';
import ReactDOMServer from "react-dom/server";
import "../App.css";


export default function BoulderPopup() {
  const map = useMap();
  const [pos, setPosition] = useState(null);
  const [tempMarkerObj, setTempMarker] = useState({});
  const [popUpopen, setPopup] = useState(false);
  const [boulderDescription, setDescription] = useState('');
  const [boulderName, setName] = useState('');
  const [boulderDifficulty, setDifficulty] = useState('');
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
        <h1>Name: </h1> <input type="text" placeholder={boulderName} onChange={(e) => setName(e.target.value)}/>
        <h1>Description: </h1> <input type="text" placeholder={boulderDescription} onChange={(e) => setDescription(e.target.value)}/>
        <h1>Difficulty: </h1> <input type="text" placeholder={boulderDifficulty} onChange={(e) => setDifficulty(e.target.value)}/>
        <div className="boulder-popup-buttons">
        <button onClick={() => {
                                 map.removeLayer(tempMarkerObj);
                                 setPopup(false);
        }}>Close</button>

        <button onClick={() => {
                                 L.marker(pos).bindPopup(ReactDOMServer.renderToString(<BoulderDescription name={boulderName} description={boulderDescription} difficulty={boulderDifficulty} />)).addTo(map);
                                 addBoulder({description: boulderDescription, 
                                             lat: pos.lat, 
                                             lng: pos.lng, 
                                             name: boulderName, 
                                             difficulty: boulderDifficulty});
                                 setPopup(false);
                                 setDescription('');
                                 setName('');
                                 setDifficulty('');
        }}>Confirm</button>
        </div>
    </div> 
    : null}
    </>
  );
}