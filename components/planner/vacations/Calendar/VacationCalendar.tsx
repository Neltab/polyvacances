"use client"

import { VacationWithEvents } from "@/app/api/vacations/types"
import MobileVacationCalendar from "./MobileVacationCalendar"
import DesktopVacationCalendar from "./DesktopVacationCalendar"
import { Media } from "@/components/providers/Media"

type VacationCalendarProps = {
  vacation: VacationWithEvents,
  editable?: boolean,
}

export default function VacationCalendar({
  vacation,
  editable = false,
}: VacationCalendarProps) {

  return (
    <>
      <Media at="sm">
        <MobileVacationCalendar vacation={vacation} editable={editable} />
      </Media>
      <Media greaterThanOrEqual="md">
        <DesktopVacationCalendar vacation={vacation} editable={editable} />
      </Media>
    </>
  )
}