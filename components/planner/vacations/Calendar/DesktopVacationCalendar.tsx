'use client'

import { Calendar, SlotInfo } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useMemo, useState } from "react";
import React from 'react';
import { Event } from '@/app/api/events/types';
import getVacationView from './VacationView';
import { VacationWithEvents } from '@/app/api/vacations/types';
import EventDialog from '../../events/EventDialog';
import NewEventDialog from '../../events/NewEventDialog';
import { eventPropGetter, FORMATS, LOCALIZER } from './constants';

type Range = { start: Date, end: Date }

type VacationCalendarProps = {
  vacation: VacationWithEvents,
  editable?: boolean,
}

export default function DesktopVacationCalendar({
  vacation,
  editable = false,
}: VacationCalendarProps) {

  const views = useMemo(() => ({
    week: getVacationView(vacation.startDate, vacation.endDate),
  }), [vacation.startDate, vacation.endDate])

  const [eventPopupOpen, setEventPopupOpen] = useState(false)
  const [newEventPopupOpen, setNewEventPopupOpen] = useState(false)
  const [newEventDateRange, setNewEventDateRange] = useState<Range | null>(null)
  const [eventSelected, setEventSelected] = useState<Event | null>(null)

  const toggleEventPopup = useCallback(
    async (event: Event) => {
      setEventSelected(event)
      setEventPopupOpen(true)
    },
    []
  )

  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setNewEventDateRange({
      start: slotInfo.start,
      end: slotInfo.end,
    })
    setNewEventPopupOpen(true)
    return true;
  }, [])

  return (
    <div>
      <Calendar
        culture='fr'
        localizer={LOCALIZER}
        defaultView="week"
        date={vacation.startDate}
        events={vacation.events || []}
        startAccessor="start"
        endAccessor="end"
        messages={{
          next: 'Suivant',
          previous: 'Précédent',
          today: 'Aujourd\'hui',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
        }}
        formats={FORMATS}
        views={views}
        eventPropGetter={eventPropGetter}
        onSelectEvent={toggleEventPopup}
        selectable={editable}
        toolbar={false}
        onSelectSlot={onSelectSlot}
      />
      {
        eventSelected &&
        <EventDialog open={eventPopupOpen} vacation={vacation} onClose={() => setEventPopupOpen(false)} event={eventSelected} />
      }
      <NewEventDialog 
        open={newEventPopupOpen}
        onClose={() => setNewEventPopupOpen(false)} 
        vacation={vacation} 
        event={{ vacationId: vacation.id, start: newEventDateRange?.start, end: newEventDateRange?.end }}
      />
    </div>
  );
}