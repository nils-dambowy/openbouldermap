import Map from './components/Map';
import './App.css';
import "leaflet/dist/leaflet.css";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";



function App() {
  return (
     <div className="container">
      <table>
        <thead>
          <tr>test row</tr>
          <tr>test row</tr>
        </thead>
      </table>
      <Map/>
     </div>
  )
}

export default App
