import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

interface LocationSectionProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  getLocation?: () => void;
}

const LocationSection = ({ coordinates, getLocation }: LocationSectionProps) => {
  const position: LatLngExpression = [coordinates.lat, coordinates.lng];

  return (
    <div className="space-y-4">
      <div className="h-[300px] rounded-lg overflow-hidden">
        <MapContainer
          className="h-full w-full"
          center={position}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationSection;