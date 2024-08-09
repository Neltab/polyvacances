'use client'

import { QueryClient, useMutation } from "@tanstack/react-query";
import { createUser } from "./server";

export const useCreateUser = (queryClient: QueryClient) => useMutation({
  mutationFn: (formData: FormData) => createUser(formData),
})