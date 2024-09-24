import { MapContainer, TileLayer, useMap} from 'react-leaflet';
import { useEffect} from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../../node_modules/leaflet-geosearch/dist/geosearch.css";
import "../App.css";
import LocateButton from './LocateButton';
import BoulderMarker from './BoulderMarker';
import BoulderPopup from './BoulderPopup';

const SearchField = (props) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      ...props
    });
    map.addControl(searchControl);
    map.on("geosearch/showlocation", function (e) {
      console.log(e.location);
    });
    return () => map.removeControl(searchControl);
  }, [map, props]);

  return null;
};

export default function Map() {
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    <BoulderMarker/>
    <LocateButton/>
    <BoulderPopup />
    </MapContainer>

  )
}