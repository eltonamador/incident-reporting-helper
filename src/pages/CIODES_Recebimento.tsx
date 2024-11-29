import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
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
import { LatLngExpression } from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CIODES_Recebimento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGBM, setSelectedGBM] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);

  const mediaItems = location.state?.mediaItems || [];
  const textContent = location.state?.textContent || "";

  const videoItems = mediaItems.filter(item => item.type === "video");
  const imageItems = mediaItems.filter(item => item.type === "image");
  const audioItems = mediaItems.filter(item => item.type === "audio");

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
                  <MapContainer
                    center={[coordinates.lat, coordinates.lng] as LatLngExpression}
                    zoom={13}
                    className="h-full w-full"
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

            {/* Containers for different media types */}
            {videoItems.length > 0 && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Vídeos</h3>
                <div className="space-y-4">
                  {videoItems.map((item, index) => (
                    <div key={`video-${index}`}>
                      <video src={item.url} controls className="w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {imageItems.length > 0 && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Fotos</h3>
                <div className="space-y-4">
                  {imageItems.map((item, index) => (
                    <div key={`image-${index}`}>
                      <img src={item.url} alt={`Imagem ${index + 1}`} className="w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {audioItems.length > 0 && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Áudios</h3>
                <div className="space-y-4">
                  {audioItems.map((item, index) => (
                    <div key={`audio-${index}`}>
                      <audio src={item.url} controls className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {textContent && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Texto</h3>
                <p className="text-gray-700">{textContent}</p>
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

export default CIODES_Recebimento;