"use client";

import { QueryClient, useMutation } from "@tanstack/react-query";
import { uploadFiles, uploadFilesBulk } from "./server";
import { FilesSchema } from "./validation";

export const useUploadFiles = (queryClient: QueryClient, eventId: number) => useMutation({
  mutationFn: async (data: FilesSchema) => uploadFiles(eventId, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
    queryClient.invalidateQueries({ queryKey: ["eventPhotos"] })
  },
});

export const useUploadFilesBulk = (queryClient: QueryClient, vacationUUID: string) => useMutation({
  mutationFn: async (data: FormData) => {console.log(vacationUUID); uploadFilesBulk(vacationUUID, data)},
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vacationsWithEvents"] })
    queryClient.invalidateQueries({ queryKey: ["eventPhotos"] })
  },
});