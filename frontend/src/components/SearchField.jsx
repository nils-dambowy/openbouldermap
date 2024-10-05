import { useMap} from 'react-leaflet';
import { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../../node_modules/leaflet-geosearch/dist/geosearch.css";
import "../App.css";


export default function  SearchField (props) {
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