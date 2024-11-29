import { Video, Image, Mic, Send, Text } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import MediaPreviewList from "./MediaPreviewList";
import AudioRecorder from "./AudioRecorder";

interface MediaItem {
  type: "video" | "image" | "audio";
  url: string;
}

const MediaCaptureSection = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async (type: string) => {
    try {
      setShowTextInput(false);

      if (type === "texto") {
        setShowTextInput(true);
        return;
      }

      if (type === "vídeo" || type === "foto") {
        if (fileInputRef.current) {
          fileInputRef.current.accept = type === "vídeo" ? "video/*" : "image/*";
          fileInputRef.current.capture = "environment";
          fileInputRef.current.click();
        }
      }
    } catch (error) {
      toast.error(`Erro ao acessar dispositivo: ${error}`);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video') ? "video" : "image";
      setMediaItems(prev => [...prev, { type, url }]);
      const typeLabel = type === "video" ? 'vídeo' : 'foto';
      toast.success(`${typeLabel} capturado com sucesso!`);
    }
  };

  const handleAudioComplete = (url: string) => {
    setMediaItems(prev => [...prev, { type: "audio", url }]);
  };

  const handleRemoveMedia = (index: number) => {
    setMediaItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    setShowTextInput(false);
    setTextContent("");
    setMediaItems([]);
    toast.success("Informações enviadas ao CIODES!");
  };

  return (
    <div className="w-full space-y-4 mt-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        capture="environment"
      />
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

      {(showTextInput || mediaItems.length > 0) && (
        <div className="space-y-4 border rounded-lg p-4">
          {showTextInput && (
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              className="w-full"
            />
          )}
          
          {mediaItems.length > 0 && (
            <MediaPreviewList 
              mediaItems={mediaItems}
              onRemove={handleRemoveMedia}
            />
          )}
        </div>
      )}

      <AudioRecorder onRecordingComplete={handleAudioComplete} />

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