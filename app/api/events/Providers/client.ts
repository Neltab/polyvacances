'use client';

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getEventsFromVacation, getEventsPhotos, uploadImages } from "./server";
import { NewEvent } from "../types";
import { EventSchema } from "./validation";

export const useGetEventsFromVacation = (vacationId: number) => useQuery({
  queryKey: ["events", vacationId],
  queryFn: () => getEventsFromVacation(vacationId),
});

export const useGetEventPhotos = (eventId: number) => useQuery({
  queryKey: ["eventPhotos", eventId],
  queryFn: () => getEventsPhotos(eventId),
});

export const useUploadImages = (queryClient: QueryClient, eventId: number) => useMutation({
  mutationFn: async (formData: FormData) => uploadImages(eventId, formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
    queryClient.invalidateQueries({ queryKey: ["eventPhotos"] })
  },
});

export const useCreateEvent = (queryClient: QueryClient) => useMutation({
  mutationFn: (data: EventSchema) => createEvent(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
  },
});