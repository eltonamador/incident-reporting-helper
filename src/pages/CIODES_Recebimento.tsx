import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import LocationSection from "@/components/LocationSection";
import MediaSection from "@/components/MediaSection";

interface Occurrence {
  id: string;
  description: string;
  location_lat: number | null;
  location_lng: number | null;
  observations: string | null;
  status: "pending" | "assigned" | "in_progress" | "completed";
  created_at: string;
}

interface OccurrenceMedia {
  id: string;
  occurrence_id: string;
  media_type: string;
  media_url: string;
}

const CIODES_Recebimento = () => {
  // Fetch pending occurrences
  const { data: occurrences, isLoading: isLoadingOccurrences } = useQuery({
    queryKey: ["pending-occurrences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("occurrences")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Erro ao carregar ocorrências");
        throw error;
      }

      return data as Occurrence[];
    },
  });

  // Fetch media for the latest occurrence
  const { data: mediaItems, isLoading: isLoadingMedia } = useQuery({
    queryKey: ["occurrence-media", occurrences?.[0]?.id],
    enabled: !!occurrences?.[0]?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("occurrence_media")
        .select("*")
        .eq("occurrence_id", occurrences[0].id);

      if (error) {
        toast.error("Erro ao carregar mídia");
        throw error;
      }

      return data as OccurrenceMedia[];
    },
  });

  if (isLoadingOccurrences || isLoadingMedia) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emergency" />
      </div>
    );
  }

  const latestOccurrence = occurrences?.[0];

  if (!latestOccurrence) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Nenhuma ocorrência pendente</p>
      </div>
    );
  }

  // Transform media items to the format expected by MediaSection
  const transformedMediaItems = mediaItems?.map(item => ({
    type: item.media_type,
    url: item.media_url
  })) || [];

  // Organize media items by type
  const videoItems = transformedMediaItems.filter(item => item.type === "video") || [];
  const imageItems = transformedMediaItems.filter(item => item.type === "image") || [];
  const audioItems = transformedMediaItems.filter(item => item.type === "audio") || [];

  const coordinates = latestOccurrence.location_lat && latestOccurrence.location_lng
    ? {
        lat: latestOccurrence.location_lat,
        lng: latestOccurrence.location_lng,
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nova Ocorrência
          </h1>
          <p className="text-gray-600">
            Recebida em: {new Date(latestOccurrence.created_at).toLocaleString()}
          </p>
        </header>

        {latestOccurrence.description && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Descrição</h2>
            <p className="text-gray-700">{latestOccurrence.description}</p>
          </div>
        )}

        {latestOccurrence.observations && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Observações</h2>
            <p className="text-gray-700">{latestOccurrence.observations}</p>
          </div>
        )}

        {(videoItems.length > 0 || imageItems.length > 0 || audioItems.length > 0) && (
          <div className="bg-white rounded-lg shadow p-6">
            <MediaSection
              videoItems={videoItems}
              imageItems={imageItems}
              audioItems={audioItems}
            />
          </div>
        )}

        {coordinates && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Localização</h2>
            <LocationSection
              coordinates={coordinates}
              getLocation={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CIODES_Recebimento;