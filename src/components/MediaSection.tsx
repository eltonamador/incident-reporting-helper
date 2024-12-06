import MediaPreviewList from "@/components/MediaPreviewList";

interface MediaSectionProps {
  videoItems: any[];
  imageItems: any[];
  audioItems: any[];
}

const MediaSection = ({ videoItems, imageItems, audioItems }: MediaSectionProps) => {
  return (
    <div className="border-b pb-4">
      <h3 className="text-sm font-medium text-gray-600 mb-2">
        Mídias Anexadas
      </h3>
      {videoItems && videoItems.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm text-gray-500 mb-2">Vídeos</h4>
          <MediaPreviewList 
            mediaItems={videoItems}
            onRemove={() => {}}
          />
        </div>
      )}
      
      {imageItems && imageItems.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm text-gray-500 mb-2">Fotos</h4>
          <MediaPreviewList 
            mediaItems={imageItems}
            onRemove={() => {}}
          />
        </div>
      )}
      
      {audioItems && audioItems.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm text-gray-500 mb-2">Áudios</h4>
          <MediaPreviewList 
            mediaItems={audioItems}
            onRemove={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default MediaSection;