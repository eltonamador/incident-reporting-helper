import { Video, Image, Mic, X } from "lucide-react";

interface MediaItem {
  type: "video" | "image" | "audio";
  url: string;
}

interface MediaPreviewListProps {
  mediaItems: MediaItem[];
  onRemove: (index: number) => void;
}

const MediaPreviewList = ({ mediaItems, onRemove }: MediaPreviewListProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "audio":
        return <Mic className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {mediaItems.map((item, index) => (
        <div key={index} className="relative border rounded-lg p-4">
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 p-1 bg-red-100 rounded-full hover:bg-red-200"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            {getIcon(item.type)}
            <span className="text-sm font-medium capitalize">{item.type}</span>
          </div>

          {item.type === "video" && (
            <video src={item.url} controls className="w-full rounded-lg" />
          )}
          
          {item.type === "image" && (
            <img src={item.url} alt="Mídia capturada" className="w-full rounded-lg" />
          )}
          
          {item.type === "audio" && (
            <audio src={item.url} controls className="w-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaPreviewList;