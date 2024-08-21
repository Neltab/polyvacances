"use client"

import { Credentials, credentialsSchema } from "@/app/api/auth/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from './LoginForm.module.css';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl");

  const { control, handleSubmit } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema)
  });
  
  const onSubmit: SubmitHandler<Credentials> = (credentials) => {
    signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      callbackUrl: callbackUrl || undefined,
    });
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Polyvacances</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <Controller name="email" control={control} render={({field}) => (
          <TextField type="text" label="Email" {...field} />
        )}/>
        <Controller name="password" control={control} render={({field}) => (
          <TextField type="password" label="Mot de passe" {...field} />
        )}/>
        <Button variant="contained" type="submit">Connexion</Button>
      </form>
      <Link href="/auth/register" className={styles.registerLink}>S&apos;inscrire</Link>
    </div>
  )
}

export default LoginForm;