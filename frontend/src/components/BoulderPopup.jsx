import { useState, useRef, useEffect } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import L from "leaflet";
import { uploadBoulders} from '../util/client';

export default function BoulderPopup() {
    const map = useMap();
    const [pos, setPosition] = useState(null);
    const [popUpopen, setPopup] = useState(false);
    const [text, setText] = useState('');
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
        setPosition(e.latlng);
        setPopup(true);
     }
    },
  })

return(<>
    { popUpopen? 
    <div className="boulder-popup" ref={divRef}>
        <h1>Description: </h1> <input type="text" placeholder={text} onChange={(e) => setText(e.target.value)}/>
        <div className="boulder-popup-buttons">
        <button onClick={() => setPopup(false)}>Close</button>
        <button onClick={() => {
                                 L.marker(pos).bindPopup(text).addTo(map);
                                 uploadBoulders("Boulder", String(pos.lat) + "," + String(pos.lng));
                                 setPopup(false);
        }}>Confirm</button>
        </div>
    </div> 
    
    
    : null}
    </>
  );
}