'use client';

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function SignInButton() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Button onClick={() => signIn(undefined, {callbackUrl: pathname})}>Se connecter</Button>
  );
}