import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationSection from "@/components/LocationSection";
import MediaSection from "@/components/MediaSection";

const SecondGBM = () => {
  const location = useLocation();
  const { occurrence, textContent, mediaItems, coordinates, observations } = location.state || {};

  // Filter media items by type
  const videoItems = mediaItems?.filter((item: any) => item.type === "video") || [];
  const imageItems = mediaItems?.filter((item: any) => item.type === "image") || [];
  const audioItems = mediaItems?.filter((item: any) => item.type === "audio") || [];

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>2º GBM - Segundo Grupamento de Bombeiro Militar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Description Section */}
            {textContent && (
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Descrição da Ocorrência
                </h3>
                <div className="p-3 bg-gray-100 rounded">
                  {textContent}
                </div>
              </div>
            )}

            {/* Observations Section */}
            {observations && (
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Observações
                </h3>
                <div className="p-3 bg-gray-100 rounded">
                  {observations}
                </div>
              </div>
            )}

            {/* Media Section */}
            {(videoItems.length > 0 || imageItems.length > 0 || audioItems.length > 0) && (
              <MediaSection
                videoItems={videoItems}
                imageItems={imageItems}
                audioItems={audioItems}
              />
            )}

            {/* Location Section */}
            {coordinates && (
              <LocationSection
                coordinates={coordinates}
                getLocation={() => {}}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecondGBM;