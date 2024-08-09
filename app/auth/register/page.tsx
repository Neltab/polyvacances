'use client'

import { useCreateUser } from "@/app/api/auth/user/Providers/client"
import { useQueryClient } from "@tanstack/react-query"

export default function LogIn() {
  const queryClient = useQueryClient()
  const userMutation = useCreateUser(queryClient)
  return (
    <form action={userMutation.mutate}>
      <label>
        Email
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <label>
        Nom
        <input name="name" type="text" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}