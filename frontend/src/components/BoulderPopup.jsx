import { useState, useRef, useEffect } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import L from "leaflet";
import { addBoulder } from '../util/services';
import BoulderDescription from './BoulderDescription';
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";

const StyledBoulderPopup = styled.div`
    padding: 1vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 95px;
    right: 10px;
    z-index: 10000;
    background-color: rgba(255, 255, 255, 0.807);
    color:rgb(43, 43, 43);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    height:30vh;
    width:25vh;
    justify-content: space-between;

    /* mobile screen settings*/
    @media screen and (max-width: 500px) {
        top: 145px;
        right: 10px;
    }
    
  `;

const StyledBoulderPopupTitle = styled.h1`
  text-align: center;
  color:rgb(43, 43, 43);
`;

const StyledBoulderPopupClose = styled.button`
  background-color: rgba(255, 0, 0, 0.734);
  color:rgb(255, 255, 255);
  margin-right: 1vh;
`;

const StyledBoulderPopupConfirm = styled.button`
  background-color: #2cdd19;
  color:rgb(255, 255, 255);
  margin-right: 1vh;
`;

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
        // is this still needed?
        setTempMarker(L.marker(e.latlng).addTo(map));
        setPosition(e.latlng);
        setPopup(true);
     }
    },
  })

return(
    <>
    { popUpopen? 
    <StyledBoulderPopup ref={divRef}>
        <StyledBoulderPopupTitle>Options</StyledBoulderPopupTitle>
        <h1>Name: </h1> <input type="text" placeholder={boulderName} onChange={(e) => setName(e.target.value)}/>
        <h1>Description: </h1> <input type="text" placeholder={boulderDescription} onChange={(e) => setDescription(e.target.value)}/>
        <h1>Difficulty: </h1> <input type="text" placeholder={boulderDifficulty} onChange={(e) => setDifficulty(e.target.value)}/>
        <div>
              <StyledBoulderPopupClose
                onClick={() => {
                  map.removeLayer(tempMarkerObj);
                  setPopup(false);
                }}
               >Close</StyledBoulderPopupClose>

              <StyledBoulderPopupConfirm
               onClick={() => {
                  // temporary marker
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
                }}>Confirm</StyledBoulderPopupConfirm>
        </div>
     </StyledBoulderPopup>
    : null}
    </>
  );
}