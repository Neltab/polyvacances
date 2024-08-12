'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import VacationView from "./VacationView";
import VacationToolbar from "./VacationToolbar";
import React from 'react';
import { Event } from '../Event/types';
import { COLORS } from '../../utils/colors';
import Popup from 'reactjs-popup';
import { EventPopup } from '../Event/EventPopup';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { VacationContext } from './Providers/context';
import './style.css';
import 'moment/locale/fr';

const localizer = momentLocalizer(moment);

type Range = { start: Date, end: Date, resourceId?: null|string|number }

export default function VacationCalendar() {
  
  const queryClient = new QueryClient();

  const formats = useMemo(() => ({
    dayFormat: `dddd DD.MM`,
  }), [])

  const views = useMemo(() => ({
    week: VacationView,
  }), [])

  const [popupOpen, setPopupOpen] = useState(false)
  const [eventSelected, setEventSelected] = useState<Event | null>(null)
  const { vacation } = useContext(VacationContext);
  const clickRef = useRef<number | undefined>(undefined)

  const eventPropGetter = useCallback(
    (event: Event) => ({
      style: {
        backgroundColor: COLORS.tags[event.tag || 'ACTIVITE'].background,
        borderTop: `3px solid ${COLORS.tags[event.tag || 'ACTIVITE'].border}`,
      }
    }),
    []
  )

  const toggleEventPopup = useCallback(
    async (event: Event) => {
      setEventSelected(event)
      setPopupOpen(true)
    },
    []
  )

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelecting = useCallback((range: Range) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      console.log(range)
    }, 250)
    return true;
  }, [])

  return (
    <div className='calendar-container'>
      <Calendar
        culture="fr"
        localizer={localizer}
        defaultView="week"
        date={vacation?.startDate}
        events={vacation?.events || []}
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
        formats={formats}
        views={views}
        components={{
          toolbar: () => <VacationToolbar />,
        }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={toggleEventPopup}
        selectable
        onSelecting={onSelecting}
      />
      <Popup open={popupOpen} closeOnDocumentClick onClose={() => setPopupOpen(false)}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {
            eventSelected &&
            <EventPopup event={eventSelected}/>
          }
        </HydrationBoundary>
      </Popup>
    </div>
  );
}