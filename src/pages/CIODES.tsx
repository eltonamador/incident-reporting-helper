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

const CIODES = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGBM, setSelectedGBM] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);

  // Get current location
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
                className="w-full"
                variant="outline"
              >
                {coordinates 
                  ? `Lat: ${coordinates.lat.toFixed(6)}, Lng: ${coordinates.lng.toFixed(6)}`
                  : "Obter Localização"}
              </Button>
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