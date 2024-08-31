import Map from './components/Map';
import './App.css';
import "leaflet/dist/leaflet.css";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownMenu from './components/DropdownMenu';

function App() {
  return (
     <div className="container">
      <div className="navbar-container">
      <DropdownMenu/>
      </div>
      <Map/>
      
     </div>
  )
}

export default App
