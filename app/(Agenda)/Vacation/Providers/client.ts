'use client';

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getVacations, getVacationById, getVacationsWithEvents, getVacationWithEventsById, createVacation } from "./server";


export const useGetVacations = () => useQuery({
  queryKey: ["vacations"],
  queryFn: () => getVacations(),
});


export const useGetVacationById = (id: number) => useQuery({
  queryKey: ["vacations", id],
  queryFn: () => getVacationById(id),
});


export const useGetVacationsWithEvents = () => useQuery({
  queryKey: ["vacationsWithEvents"],
  queryFn: () => getVacationsWithEvents(),
});


export const useGetVacationWithEventsById = (id: number) => useQuery({
  queryKey: ["vacationsWithEvents", id],
  queryFn: () => getVacationWithEventsById(id),
});

export const useCreateVacation = (queryClient: QueryClient) => useMutation({
  mutationFn: (formData: FormData) => createVacation(formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacations"] })
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] });
  } 
})