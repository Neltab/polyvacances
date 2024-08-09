'use client';

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getEventsPhotos, uploadImages } from "./server";

export const useGetEventPhotos = (eventId: number) => useQuery({
  queryKey: ["eventPhotos", eventId],
  queryFn: () => getEventsPhotos(eventId),
});

export const useUploadImages = (queryClient: QueryClient, eventId: number) => useMutation({
  mutationFn: (formData: FormData) => uploadImages(eventId, formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
    queryClient.invalidateQueries({ queryKey: ["eventPhotos"] })
  },
});

export const useCreateEvent = (queryClient: QueryClient) => useMutation({
  mutationFn: (formData: FormData) => createEvent(formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
  },
});