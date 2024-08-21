'use server'

import { canEditVacation, getVacationNavigation } from "@/app/api/vacations/Providers/server";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NewVacationButton from "../../../../components/planner/vacations/NewVacationButton";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    vacationUUID: string;
  };
}

export default async function Layout({ children, params: { vacationUUID } }: LayoutProps) {

  const canEdit = await canEditVacation(vacationUUID);
  const vacationNavigation = await getVacationNavigation(vacationUUID);

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
              <NewVacationButton />
            )
          }
        </div>
        <div className="flex gap-6">
          Overview
        </div>
        {children}
      </div>
    </div>
  )
}