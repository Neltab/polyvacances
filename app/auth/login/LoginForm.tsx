"use client"

import { signIn } from "next-auth/react";

export default () => {
  
  const login = (formData: FormData) => {
    const credentials = Object.fromEntries(formData.entries());
    signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
    });
  }

  return (
    <form action={login}>
      <label>
        Email
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}