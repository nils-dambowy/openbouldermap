import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "../assets/marker-icon.png",
  shadowUrl: "../assets/marker-shadow.png"
});

export default icon;