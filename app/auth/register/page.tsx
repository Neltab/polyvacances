'use client'

import { useCreateUser } from "@/app/api/auth/user/Providers/client"
import { Credentials, NewUser, userSchema } from "@/app/api/auth/user/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField, Button } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from './Register.module.css'
import Link from "next/link"

export default function LogIn() {
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
          redirect: true,
        });
      }
    })
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Polyvacances</h1>
      <h2 className={styles.loginSubtitle}>Créer un compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <Controller name="email" control={control} render={({field}) => (
          <TextField type="text" label="Email" {...field} />
        )}/>
        <Controller name="password" control={control} render={({field}) => (
          <TextField type="password" label="Mot de passe" {...field} />
        )}/>
        <Controller name="name" control={control} render={({field}) => (
          <TextField type="text" label="Nom" {...field} />
        )}/>
        <Button variant="contained" type="submit">Envoyer</Button>
      </form>
      <Link href="/auth/login" className={styles.loginLink}>Se connecter</Link>
    </div>
  )
}