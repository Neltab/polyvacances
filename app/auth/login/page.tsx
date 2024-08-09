import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LogIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <LoginForm>

    </LoginForm>
  )
}