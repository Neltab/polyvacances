import { Params } from "../../types";
import VacationCalendar from "@/components/planner/vacations/Calendar/VacationCalendar";
import { getVacationWithEventsByUUID } from "@/app/api/vacations/Providers/server";
import { canEditVacation } from "@/app/api/auth/vacation";

type PlanningPageProps = {
  params: Params;
}

export default async function Page({ params: { vacationUUID } }: PlanningPageProps) {

  const vacation = await getVacationWithEventsByUUID(vacationUUID);
  const canEdit = await canEditVacation(vacationUUID);

  if (!vacation) {
    return <div>Vacation not found</div>
  }

  return (
    <VacationCalendar editable={canEdit} vacation={vacation} />
  )
}