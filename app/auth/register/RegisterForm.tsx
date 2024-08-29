"use client"

import { NewUser, userSchema } from "@/app/api/auth/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/app/api/auth/user/Providers/client";
import { useQueryClient } from "@tanstack/react-query";

export default function RegisterForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl");
  const queryClient = useQueryClient()

  const userMutation = useCreateUser(queryClient)

  const { control, handleSubmit } = useForm<NewUser>({
    resolver: zodResolver(userSchema)
  });
  
  const onSubmit: SubmitHandler<NewUser> = (credentials) => {
    userMutation.mutate(credentials, {
      onSuccess: () => {
        signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          callbackUrl: callbackUrl || undefined,
        });
      }
    })
  }
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-6 items-center"}>
        <Controller name="email" control={control} render={({field}) => (
          <TextField type="text" label="Email" {...field} />
        )}/>
        <Controller name="password" control={control} render={({field}) => (
          <TextField type="password" label="Mot de passe" {...field} />
        )}/>
        <Controller name="name" control={control} render={({field}) => (
          <TextField type="text" label="Nom" {...field} />
        )}/>
        <Button status={userMutation.status} type="submit">Connexion</Button>
      </form>
      <Link href={`/auth/login?callbackUrl=${callbackUrl}`} className="text-secondary underline">Se connecter</Link>
    </>
  )
}