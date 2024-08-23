import { getMyVacations } from "@/app/api/vacations/Providers/server";
import { getServerSession } from "next-auth"
import Link from "next/link";
import SignInButton from "./SignInButton";
import NewVacationButton from "./vacations/NewVacationButton";

export default async function VacationList() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center max-w-full gap-4">
        <h1>Connectez vous pour accéder à vos vacances</h1>
        <SignInButton />
      </div>
    )
  }

  const myVacations = await getMyVacations();

  return (
    <div className="px-6 flex flex-col gap-3">
      {myVacations.map((vacation) => (
        <div key={vacation.id} className="text-base">
          <Link href={`/planner/vacation/${vacation.uuid}/overview`}>{vacation.location}</Link>
        </div>
      ))}
      <NewVacationButton />
    </div>
  )
}