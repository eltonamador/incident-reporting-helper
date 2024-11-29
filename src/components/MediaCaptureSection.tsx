import { Video, Image, Mic, Send, Text } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const MediaCaptureSection = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = async (type: string) => {
    if (type === "foto") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setShowCamera(true);
        
        // Create video element to show camera feed
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        
        // Create canvas to capture the photo
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Wait for video to be ready
        video.addEventListener('loadedmetadata', () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Add click event to take photo
          document.addEventListener('click', () => {
            if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = canvas.toDataURL('image/jpeg');
              setCapturedImage(imageData);
              
              // Stop camera stream
              stream.getTracks().forEach(track => track.stop());
              setShowCamera(false);
              
              toast.success("Foto capturada com sucesso!");
            }
          }, { once: true });
        });
      } catch (error) {
        console.error("Erro ao acessar a câmera:", error);
        toast.error("Não foi possível acessar a câmera");
        setShowCamera(false);
      }
    } else {
      // Handle other media types
      toast.info(`Capturando ${type}...`);
    }
  };

  const handleSend = () => {
    toast.success("Informações enviadas ao CIODES!");
  };

  return (
    <div className="w-full space-y-4 mt-6">
      {showCamera ? (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <video
            autoPlay
            playsInline
            className="max-w-full max-h-full"
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="absolute bottom-4 text-white text-center w-full">
            Toque na tela para tirar a foto
          </div>
        </div>
      ) : (
        <>
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

          {capturedImage && (
            <div className="mt-4">
              <img src={capturedImage} alt="Foto capturada" className="max-w-full rounded-lg" />
            </div>
          )}

          <button
            onClick={handleSend}
            className="w-full py-4 bg-emergency text-white rounded-lg shadow hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>Enviar ao CIODES</span>
          </button>
        </>
      )}
    </div>
  );
};

export default MediaCaptureSection;