import { Video, Image, Mic, Send, Text } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const MediaCaptureSection = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const stopMediaStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setRecordedChunks([]);
  };

  const handleCapture = async (type: string) => {
    try {
      stopMediaStream();
      setShowTextInput(false);

      if (type === "texto") {
        setShowTextInput(true);
        return;
      }

      let stream: MediaStream;
      
      if (type === "vídeo") {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment'
          },
          audio: true
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setMediaStream(stream);
        
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          setRecordedChunks(chunks);
          stopMediaStream();
          toast.success("Vídeo capturado com sucesso!");
        };

        mediaRecorder.start();
        setIsRecording(true);
        toast.info("Gravando vídeo...");
      } else if (type === "foto") {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment'
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setMediaStream(stream);
        toast.info("Capturando foto...");
      } else if (type === "áudio") {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
        
        mediaRecorderRef.current = new MediaRecorder(stream);
        setIsRecording(true);
        setMediaStream(stream);
        
        mediaRecorderRef.current.start();
        toast.info("Gravando áudio...");
      }
    } catch (error) {
      toast.error(`Erro ao acessar dispositivo: ${error}`);
    }
  };

  const handleSend = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    stopMediaStream();
    setShowTextInput(false);
    setTextContent("");
    setIsRecording(false);
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

      {(mediaStream || showTextInput) && (
        <div className="space-y-4 border rounded-lg p-4">
          {(mediaStream && videoRef) && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
          )}
          
          {showTextInput && (
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              className="w-full"
            />
          )}
        </div>
      )}

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