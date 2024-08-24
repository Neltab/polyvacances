"use client"

import { VacationWithEvents } from "@/app/api/vacations/types"
import { useMediaQuery } from 'react-responsive'
import MobileVacationCalendar from "./MobileVacationCalendar"
import DesktopVacationCalendar from "./DesktopVacationCalendar"

type VacationCalendarProps = {
  vacation: VacationWithEvents,
  editable?: boolean,
}

export default function VacationCalendar({
  vacation,
  editable = false,
}: VacationCalendarProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  if (isMobile) {
    return <MobileVacationCalendar vacation={vacation} editable={editable} />
  }

  return <DesktopVacationCalendar vacation={vacation} editable={editable} />
}