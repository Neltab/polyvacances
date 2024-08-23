'use server'

import { getVacationByUUID, getVacationNavigation } from "@/app/api/vacations/Providers/server";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { canEditVacation } from "@/app/api/auth/vacation";
import PlannerTabs from "@/components/planner/PlannerTabs";
import ModifyVacationButton from "@/components/planner/vacations/ModifyVacationButton";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    vacationUUID: string;
  };
}

export default async function Layout({ children, params: { vacationUUID } }: LayoutProps) {

  const canEdit = await canEditVacation(vacationUUID);
  const vacationNavigation = await getVacationNavigation(vacationUUID);
  const vacation = await getVacationByUUID(vacationUUID, { participants: true });

  if (!vacation) {
    return <div>404</div>
  }

  return (
    <div className="flex flex-1 bg-grey-lightest2 min-h-screen">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {vacationNavigation.previous && <Link href={`/planner/vacation/${vacationNavigation.previous.uuid}/overview`}><FaChevronLeft /></Link>}
            <h1 className="text-3xl text-secondary font-bold">{vacationNavigation.current.location}</h1>
            {vacationNavigation.next && <Link href={`/planner/vacation/${vacationNavigation.next.uuid}/overview`}><FaChevronRight /></Link>}
          </div>
          {
            canEdit && (
              <ModifyVacationButton vacation={vacation}/>
            )
          }
        </div>
        <PlannerTabs vacationUUID={vacationUUID} />
        {children}
      </div>
    </div>
  )
}