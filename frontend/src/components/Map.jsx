import { MapContainer, TileLayer} from 'react-leaflet';
import { useState} from 'react';
import "../../node_modules/leaflet-geosearch/dist/geosearch.css";
import "../App.css";
import LocateButton from './LocateButton';
import ChangeMapButton from './ChangeMapButton';
import BoulderMarker from './BoulderMarker';
import BoulderPopup from './BoulderPopup';
import SearchField from './SearchField';


export default function Map() {
  const [tileLayerUrl, setTileLayerUrl] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  return (
     // default location is fontainebleau, france because why not
     <MapContainer center={[48.405, 2.702]} zoom={13}>
       <SearchField
          showMarker={false}
          showPopup={false}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter address, please"}
          keepResult={false}
        />
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayerUrl}
        />
      <BoulderMarker/>
      <ChangeMapButton URL={tileLayerUrl} changeMapFunction={setTileLayerUrl}/>
      <LocateButton/>
      <BoulderPopup />
    </MapContainer>

  )
}
