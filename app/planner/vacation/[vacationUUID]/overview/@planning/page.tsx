import { Params } from "../../types";
import VacationCalendar from "../../../../../../components/planner/vacations/VacationCalendar";
import { getMyVacations, getVacationWithEventsByUUID } from "@/app/api/vacations/Providers/server";

type PlanningPageProps = {
  params: Params;
}

export default async function Page({ params: { vacationUUID } }: PlanningPageProps) {

  const vacation = await getVacationWithEventsByUUID(vacationUUID);
  const vacations = await getMyVacations();

  if (!vacation) {
    return <div>Vacation not found</div>
  }

  return (
    <VacationCalendar vacations={vacations} vacation={vacation} />
  )
}