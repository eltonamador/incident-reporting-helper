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

// Fix Leaflet icon issue
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

  // Filter media items by type
  const videoItems = location.state?.mediaItems?.filter((item: any) => item.type === "video") || [];
  const imageItems = location.state?.mediaItems?.filter((item: any) => item.type === "image") || [];
  const audioItems = location.state?.mediaItems?.filter((item: any) => item.type === "audio") || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Detalhes da Ocorrência</h2>
          
          <div className="space-y-6">
            {/* Text Content Section */}
            {location.state?.textContent && (
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Descrição da Ocorrência
                </h3>
                <div className="p-3 bg-gray-100 rounded">
                  {location.state.textContent}
                </div>
              </div>
            )}

            {/* Media Section */}
            {(videoItems.length > 0 || imageItems.length > 0 || audioItems.length > 0) && (
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Mídias Anexadas
                </h3>
                {videoItems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-500 mb-2">Vídeos</h4>
                    <MediaPreviewList 
                      mediaItems={videoItems}
                      onRemove={() => {}}
                    />
                  </div>
                )}
                
                {imageItems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-500 mb-2">Fotos</h4>
                    <MediaPreviewList 
                      mediaItems={imageItems}
                      onRemove={() => {}}
                    />
                  </div>
                )}
                
                {audioItems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-500 mb-2">Áudios</h4>
                    <MediaPreviewList 
                      mediaItems={audioItems}
                      onRemove={() => {}}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Location Section */}
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
              
              {coordinates && (
                <div className="h-[200px] w-full rounded-lg overflow-hidden border border-gray-200">
                  <MapContainer
                    className="h-full w-full"
                    center={[coordinates.lat, coordinates.lng]}
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

            {/* GBM Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Selecione o GBM
              </h3>
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
