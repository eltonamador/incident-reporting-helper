import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Send } from "lucide-react";
import { toast } from "sonner";

interface LocationState {
  emergencyType: string;
  mediaItems: Array<{
    type: "video" | "image" | "audio";
    url: string;
  }>;
}

const CIODES = () => {
  const location = useLocation();
  const { emergencyType, mediaItems } = location.state as LocationState;
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setIsLoadingLocation(false);
            toast.success("Localização obtida com sucesso!");
          },
          (error) => {
            console.error("Erro ao obter localização:", error);
            toast.error("Não foi possível obter sua localização");
            setIsLoadingLocation(false);
          }
        );
      } else {
        toast.error("Geolocalização não suportada pelo navegador");
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const handleSubmit = () => {
    // Here you would implement the actual submission to CIODES
    toast.success("Ocorrência enviada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-lg mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmação de Envio</h1>
          <p className="text-gray-600">Verifique os dados antes de enviar</p>
        </header>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-lg mb-2">Tipo de Ocorrência</h2>
            <p className="text-gray-700">{emergencyType}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Localização</h2>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-emergency" />
              {isLoadingLocation ? (
                <p>Obtendo localização...</p>
              ) : coordinates ? (
                <p>
                  Latitude: {coordinates.latitude.toFixed(6)}, Longitude:{" "}
                  {coordinates.longitude.toFixed(6)}
                </p>
              ) : (
                <p>Localização não disponível</p>
              )}
            </div>
          </div>

          {mediaItems && mediaItems.length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Mídias Anexadas</h2>
              <div className="space-y-4">
                {mediaItems.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="text-sm font-medium mb-2 capitalize">
                      {item.type}
                    </p>
                    {item.type === "video" && (
                      <video src={item.url} controls className="w-full rounded-lg" />
                    )}
                    {item.type === "image" && (
                      <img
                        src={item.url}
                        alt="Mídia capturada"
                        className="w-full rounded-lg"
                      />
                    )}
                    {item.type === "audio" && (
                      <audio src={item.url} controls className="w-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-emergency text-white rounded-lg shadow hover:bg-red-600 transition-colors flex items-center justify-center gap-2 mt-6"
          >
            <Send className="w-5 h-5" />
            <span>Confirmar e Enviar ao CIODES</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CIODES;