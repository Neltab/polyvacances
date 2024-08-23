import { getMyVacations } from "@/app/api/vacations/Providers/server";
import Link from "next/link";
import NewVacationButton from "./vacations/NewVacationButton";

export default async function VacationList() {
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