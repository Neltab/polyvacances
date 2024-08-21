import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default async function LogIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm/>
    </Suspense>
  )
}