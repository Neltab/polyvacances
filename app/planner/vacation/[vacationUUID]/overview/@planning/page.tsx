import { Params } from "../../types";
import VacationCalendar from "../../../../../../components/planner/vacations/VacationCalendar";
import { getMyVacations, getVacationWithEventsByUUID } from "@/app/api/vacations/Providers/server";
import { canEditVacation } from "@/app/api/auth/vacation";

type PlanningPageProps = {
  params: Params;
}

export default async function Page({ params: { vacationUUID } }: PlanningPageProps) {

  const vacation = await getVacationWithEventsByUUID(vacationUUID);
  const vacations = await getMyVacations();
  const canEdit = await canEditVacation(vacationUUID);

  if (!vacation) {
    return <div>Vacation not found</div>
  }

  return (
    <VacationCalendar editable={canEdit} vacations={vacations} vacation={vacation} />
  )
}