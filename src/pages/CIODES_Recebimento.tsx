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
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import LocationSection from "@/components/LocationSection";
import MediaSection from "@/components/MediaSection";

const CIODES_Recebimento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGBM, setSelectedGBM] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [observations, setObservations] = useState("");

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

  const handleSendToGBM = async () => {
    if (!selectedGBM) {
      toast.error("Selecione um GBM");
      return;
    }

    try {
      // Create occurrence record
      const { data: occurrence, error: occurrenceError } = await supabase
        .from('occurrences')
        .insert({
          description: location.state?.textContent || '',
          location_lat: coordinates?.lat,
          location_lng: coordinates?.lng,
          status: 'pending',
          assigned_gbm: selectedGBM,
          observations: observations
        })
        .select()
        .single();

      if (occurrenceError) throw occurrenceError;

      // Upload media files
      if (location.state?.mediaItems?.length > 0) {
        const mediaPromises = location.state.mediaItems.map(async (item: any) => {
          return supabase
            .from('occurrence_media')
            .insert({
              occurrence_id: occurrence.id,
              media_type: item.type,
              media_url: item.url
            });
        });

        await Promise.all(mediaPromises);
      }

      toast.success(`Ocorrência enviada para ${selectedGBM}`);
      navigate("/");
    } catch (error: any) {
      toast.error(`Erro ao enviar ocorrência: ${error.message}`);
    }
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

            {/* Observations Section */}
            <div className="border-b pb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Observações
              </h3>
              <Textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Digite observações adicionais sobre a ocorrência..."
                className="min-h-[100px]"
              />
            </div>

            {/* Media Section */}
            {(videoItems.length > 0 || imageItems.length > 0 || audioItems.length > 0) && (
              <MediaSection
                videoItems={videoItems}
                imageItems={imageItems}
                audioItems={audioItems}
              />
            )}

            {/* Location Section */}
            <LocationSection
              coordinates={coordinates}
              getLocation={getLocation}
            />

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