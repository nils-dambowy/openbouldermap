import Map from './components/Map';
import './App.css';
import "leaflet/dist/leaflet.css";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";



function App() {
  return (
     <div className="container">
      <table>
        <thead>
          <tr>Option 1</tr>
          <tr>Option 2</tr>
          <tr>Option 3</tr>
          <tr>Option 4</tr>
          <tr>Option 5</tr>
        </thead>
      </table>
      <Map/>
     </div>
  )
}

export default App
