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
import { useSwipeable } from 'react-swipeable';
import { addDays, max, min } from 'date-fns';

type Range = { start: Date, end: Date }

type VacationCalendarProps = {
  vacation: VacationWithEvents,
  editable?: boolean,
}

export default function MobileVacationCalendar({
  vacation,
  editable = false,
}: VacationCalendarProps) {
  
  const [eventPopupOpen, setEventPopupOpen] = useState(false)
  const [newEventPopupOpen, setNewEventPopupOpen] = useState(false)
  const [newEventDateRange, setNewEventDateRange] = useState<Range | null>(null)
  const [eventSelected, setEventSelected] = useState<Event | null>(null)
  const [daySelected, setDaySelected] = useState<Date>(vacation.startDate)

  const views = useMemo(() => ({
    day: getVacationView(daySelected, daySelected),
  }), [daySelected])

  const incrementDay = useCallback(() => {
    setDaySelected(min([addDays(daySelected, 1), vacation.endDate]))
  }, [daySelected, vacation.endDate])

  const decrementDay = useCallback(() => {
    setDaySelected(max([addDays(daySelected, -1), vacation.startDate]))
  }, [daySelected, vacation.startDate])

  const handlers = useSwipeable({
    onSwipedLeft: incrementDay,
    onSwipedRight: decrementDay,
  });

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
    <div className='calendar-container' {...handlers}>
      <Calendar
        culture='fr'
        localizer={LOCALIZER}
        defaultView="day"
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