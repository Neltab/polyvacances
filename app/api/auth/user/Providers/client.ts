'use client'

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUser, getUsers } from "./server";
import { NewUser } from "../types";

export const useCreateUser = (queryClient: QueryClient) => useMutation({
  mutationFn: (data: NewUser) => createUser(data),
})

export const useGetUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: () => getUsers(),
})

export const useGetUser = (email: string) => useQuery({
  queryKey: ['user', email],
  queryFn: () => getUser(email),
})