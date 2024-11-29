import { FireExtinguisher, Ambulance } from "lucide-react";
import EmergencyTypeButton from "@/components/EmergencyTypeButton";
import MediaCaptureSection from "@/components/MediaCaptureSection";
import { toast } from "sonner";

const Index = () => {
  const handleEmergencySelect = (type: string) => {
    toast.info(`Tipo de ocorrência selecionado: ${type}`);
  };

  const emergencyTypes = [
    { icon: FireExtinguisher, label: "Incêndio em casas ou comércio" },
    { icon: Ambulance, label: "Salvamento envolvendo altura" },
    { icon: Ambulance, label: "Acidente de trânsito com vítimas" },
    { icon: Ambulance, label: "Salvamentos em Geral" },
    { icon: Ambulance, label: "Tentativa de Suicídio" },
    { icon: Ambulance, label: "Afogamento" },
    { icon: Ambulance, label: "Outros" },
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
            />
          ))}
        </div>

        <MediaCaptureSection />
      </div>
    </div>
  );
};

export default Index;