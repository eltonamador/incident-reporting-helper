import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const Solicitante_Esperando = () => {
  const [status, setStatus] = useState("Aguardando confirmação do CIODES");
  
  useEffect(() => {
    // Simulate status updates
    const timer = setTimeout(() => {
      setStatus("Viatura a caminho");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Status da Ocorrência</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>{status}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Localização da Viatura</h2>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Mapa será implementado aqui</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solicitante_Esperando;