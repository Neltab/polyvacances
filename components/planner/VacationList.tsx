import { getMyVacations } from "@/app/api/vacations/Providers/server";
import { Button } from "@mui/material";
import { getServerSession } from "next-auth"
import Link from "next/link";

export default async function VacationList() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div>
        <h1>Connectez vous pour accéder à vos vacances</h1>
        <Button variant="contained" href="/api/auth/signin">Se connecter</Button>
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