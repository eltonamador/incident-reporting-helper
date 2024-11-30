import { FireExtinguisher, TreePine, Building2, ArrowUpFromLine, Car, LifeBuoy, HelpCircle } from "lucide-react";
import EmergencyTypeButton from "@/components/EmergencyTypeButton";
import MediaCaptureSection from "@/components/MediaCaptureSection";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);

  const handleEmergencySelect = (type: string) => {
    setSelectedEmergency(type);
    toast.info(`Tipo de ocorrência selecionado: ${type}`);
    // Get location when emergency type is selected
    getLocation();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success("Localização obtida com sucesso!");
        },
        (error) => {
          toast.error("Erro ao obter localização: " + error.message);
        }
      );
    } else {
      toast.error("Geolocalização não suportada pelo navegador");
    }
  };

  const handleSubmit = () => {
    if (!selectedEmergency) {
      toast.error("Selecione um tipo de ocorrência");
      return;
    }

    navigate("/ciodes", {
      state: {
        emergencyType: selectedEmergency,
        coordinates,
      }
    });
  };

  const emergencyTypes = [
    { icon: Building2, label: "Incêndio em casas ou comércio" },
    { icon: TreePine, label: "Incêndio em Vegetação" },
    { icon: ArrowUpFromLine, label: "Salvamento envolvendo altura" },
    { icon: Car, label: "Acidente de trânsito com vítimas" },
    { icon: FireExtinguisher, label: "Salvamentos em Geral" },
    { icon: HelpCircle, label: "Tentativa de Suicídio" },
    { icon: LifeBuoy, label: "Afogamento" },
    { icon: HelpCircle, label: "Outros" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-lg mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reportar Emergência</h1>
          <p className="text-gray-600">Selecione o tipo de ocorrência</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyTypes.map((type) => (
            <EmergencyTypeButton
              key={type.label}
              icon={type.icon}
              label={type.label}
              onClick={() => handleEmergencySelect(type.label)}
              isSelected={selectedEmergency === type.label}
            />
          ))}
        </div>

        {coordinates && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              Localização capturada: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          </div>
        )}

        <MediaCaptureSection />

        <button
          onClick={handleSubmit}
          className="w-full bg-emergency hover:bg-emergency/90 text-white py-3 rounded-lg font-medium"
        >
          Enviar Ocorrência
        </button>
      </div>
    </div>
  );
};

export default Index;
