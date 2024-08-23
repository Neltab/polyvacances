'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Photos', value: 'photos' },
  // { label: 'Dépenses', value: 'expenses' },
  // { label: 'Sondages', value: 'polls' },
  // { label: 'Réservations', value: 'bookings' },
  // { label: 'Checklists', value: 'checklists' },
];

const LINK_STYLE = 'text-primary border-b-2 border-primary';

type PlannerTabsProps = {
  vacationUUID: string;
}

export default function PlannerTabs({
  vacationUUID,
}: PlannerTabsProps) {

  const pathname = usePathname();
  const currentTab = pathname.split('/').pop();

  return (
    <div className="flex gap-9 border-b border-secondary-lighter">
      {TABS.map(tab => (
        <Link key={tab.value} href={`/planner/vacation/${vacationUUID}/${tab.value}`}>
          <p className={tab.value === currentTab ? LINK_STYLE : ""}>{tab.label}</p>
        </Link>
      ))}
    </div>
  )
}