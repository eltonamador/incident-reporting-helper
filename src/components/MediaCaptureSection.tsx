import { Video, Image, Mic, Send, Text } from "lucide-react";
import { toast } from "sonner";

const MediaCaptureSection = () => {
  const handleCapture = (type: string) => {
    // In a real app, this would handle actual media capture
    toast.info(`Capturando ${type}...`);
  };

  const handleSend = () => {
    toast.success("Informações enviadas ao CIODES!");
  };

  return (
    <div className="w-full space-y-4 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleCapture("vídeo")}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors gap-2 border border-gray-200"
        >
          <Video className="w-6 h-6 text-emergency" />
          <span className="text-sm">Vídeo</span>
        </button>
        
        <button
          onClick={() => handleCapture("foto")}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors gap-2 border border-gray-200"
        >
          <Image className="w-6 h-6 text-emergency" />
          <span className="text-sm">Foto</span>
        </button>
        
        <button
          onClick={() => handleCapture("áudio")}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors gap-2 border border-gray-200"
        >
          <Mic className="w-6 h-6 text-emergency" />
          <span className="text-sm">Áudio</span>
        </button>

        <button
          onClick={() => handleCapture("texto")}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors gap-2 border border-gray-200"
        >
          <Text className="w-6 h-6 text-emergency" />
          <span className="text-sm">Texto</span>
        </button>
      </div>

      <button
        onClick={handleSend}
        className="w-full py-4 bg-emergency text-white rounded-lg shadow hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        <span>Enviar ao CIODES</span>
      </button>
    </div>
  );
};

export default MediaCaptureSection;