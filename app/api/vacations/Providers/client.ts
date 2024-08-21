'use client';

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getVacations, getVacationByUUID, getVacationsWithEvents, getVacationWithEventsByUUID, createVacation, getMyVacations } from "./server";
import { VacationSchema } from "./validation";


export const useGetVacations = () => useQuery({
  queryKey: ["vacations"],
  queryFn: () => getVacations(),
});

export const useGetMyVacations = () => useQuery({
  queryKey: ["myVacations"],
  queryFn: () => getMyVacations(),
});

export const useGetVacationByUUID = (uuid: string) => useQuery({
  queryKey: ["vacations", uuid],
  queryFn: () => getVacationByUUID(uuid),
});


export const useGetVacationsWithEvents = () => useQuery({
  queryKey: ["vacationsWithEvents"],
  queryFn: () => getVacationsWithEvents(),
});


export const useGetVacationWithEventsByUUID = (uuid: string) => useQuery({
  queryKey: ["vacationsWithEvents", uuid],
  queryFn: () => getVacationWithEventsByUUID(uuid),
});

export const useCreateVacation = (queryClient: QueryClient) => useMutation({
  mutationFn: (data: VacationSchema) => createVacation(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacations"] })
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] });
  } 
})