import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Button } from "@/components/ui/button";

interface LocationSectionProps {
  coordinates: { lat: number; lng: number } | null;
  getLocation: () => void;
}

const LocationSection = ({ coordinates, getLocation }: LocationSectionProps) => {
  const defaultCenter: LatLngExpression = [-20.2976, -40.2928]; // Default to Vitória, ES
  const center: LatLngExpression = coordinates 
    ? [coordinates.lat, coordinates.lng] 
    : defaultCenter;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-2">
        Localização
      </h3>
      <Button 
        onClick={getLocation}
        className="w-full mb-4"
        variant="outline"
      >
        {coordinates 
          ? `Lat: ${coordinates.lat.toFixed(6)}, Lng: ${coordinates.lng.toFixed(6)}`
          : "Obter Localização"}
      </Button>
      
      <div className="h-[200px] w-full rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          className="h-full w-full"
          center={center as LatLngExpression}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {coordinates && <Marker position={[coordinates.lat, coordinates.lng] as LatLngExpression} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationSection;