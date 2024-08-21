import { getMyVacations } from "@/app/api/vacations/Providers/server";
import { getServerSession } from "next-auth"
import Link from "next/link";
import SignInButton from "./SignInButton";

export default async function VacationList() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="max-w-[100px]">
        <h1>Connectez vous pour accéder à vos vacances</h1>
        <SignInButton />
      </div>
    )
  }

  const myVacations = await getMyVacations();

  return (
    <div>
      {myVacations.map((vacation) => (
        <div key={vacation.id}>
          <Link href={`/planner/vacation/${vacation.uuid}/overview`}>{vacation.location}</Link>
        </div>
      ))}
    </div>
  )
}