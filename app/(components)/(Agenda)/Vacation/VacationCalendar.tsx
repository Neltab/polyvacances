'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css'
import { useCallback, useContext, useMemo, useState } from "react";
import VacationView from "./VacationView";
import VacationToolbar from "./VacationToolbar";
import React from 'react';
import { Event } from '../Event/types';
import { COLORS } from '../../utils/colors';
import Popup from 'reactjs-popup';
import { EventPopup } from '../Event/EventPopup';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import AgendaSpeedDial from '../SpeedDial';
import { VacationContext } from './Providers/context';

const localizer = momentLocalizer(moment)

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

  return (
    <>
      <Calendar
        culture="fr"
        localizer={localizer}
        defaultView="week"
        date={vacation?.startDate}
        events={vacation?.events || []}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
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
      />
      <AgendaSpeedDial />
      <Popup open={popupOpen} closeOnDocumentClick onClose={() => setPopupOpen(false)}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {
            eventSelected &&
            <EventPopup event={eventSelected}/>
          }
        </HydrationBoundary>
      </Popup>
    </>
  );
}