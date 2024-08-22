'use client';

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getEvent, getEventsFromVacation, getEventsPhotos, updateEvent, uploadImages } from "./server";
import { CreateEventSchema, UpdateEventSchema } from "./validation";

export const useGetEventsFromVacation = (vacationId: number) => useQuery({
  queryKey: ["vacationEvents", vacationId],
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

export const useGetEvent = (eventId: number) => useQuery({
  queryKey: ["events", eventId],
  queryFn: () => getEvent(eventId),
});

export const useCreateEvent = (queryClient: QueryClient) => useMutation({
  mutationFn: (data: CreateEventSchema) => createEvent(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
  },
});

export const useUpdateEvent = (queryClient: QueryClient) => useMutation({
  mutationFn: (data: UpdateEventSchema) => updateEvent(data),
  onSuccess: ({id}) => {
    queryClient.invalidateQueries({ queryKey: ["events", id] })
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
  },
});