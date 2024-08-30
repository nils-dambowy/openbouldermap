import { MapContainer, TileLayer, useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "../App.css";
import { useEffect} from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

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

     <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchField
          showMarker={false}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter address, please"}
          keepResult={false}
        />
    </MapContainer>

  )
}