import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import MediaPreviewList from "@/components/MediaPreviewList";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngExpression, Map as LeafletMap } from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CIODES = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGBM, setSelectedGBM] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          toast.error("Erro ao obter localização: " + error.message);
        }
      );
    } else {
      toast.error("Geolocalização não suportada pelo navegador");
    }
  };

  const handleSendToGBM = () => {
    if (!selectedGBM) {
      toast.error("Selecione um GBM");
      return;
    }
    
    toast.success(`Ocorrência enviada para ${selectedGBM}`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Detalhes da Ocorrência</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Ocorrência
              </label>
              <div className="p-3 bg-gray-100 rounded">
                {location.state?.emergencyType || "Não especificado"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Localização
              </label>
              <Button 
                onClick={getLocation}
                className="w-full mb-4"
                variant="outline"
              >
                {coordinates 
                  ? `Lat: ${coordinates.lat.toFixed(6)}, Lng: ${coordinates.lng.toFixed(6)}`
                  : "Obter Localização"}
              </Button>
              
              {coordinates && (
                <div className="h-[200px] w-full rounded-lg overflow-hidden border border-gray-200">
                  <MapContainer<LeafletMap>
                    className="h-full w-full"
                    center={[coordinates.lat, coordinates.lng] as LatLngExpression}
                    zoom={13}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[coordinates.lat, coordinates.lng]} />
                  </MapContainer>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Selecione o GBM
              </label>
              <Select onValueChange={setSelectedGBM}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um GBM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1º GBM">1º GBM</SelectItem>
                  <SelectItem value="2º GBM">2º GBM</SelectItem>
                  <SelectItem value="GAPH">GAPH</SelectItem>
                  <SelectItem value="GMAF">GMAF</SelectItem>
                  <SelectItem value="5º GBM">5º GBM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {location.state?.mediaItems && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mídias Anexadas
                </label>
                <MediaPreviewList 
                  mediaItems={location.state.mediaItems} 
                  onRemove={() => {}} 
                />
              </div>
            )}

            <Button 
              onClick={handleSendToGBM}
              className="w-full bg-emergency hover:bg-emergency/90"
            >
              Enviar ao GBM
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIODES;