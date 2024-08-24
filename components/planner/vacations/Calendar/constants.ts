import { COLORS } from "@/lib/utils/colors";
import { Event } from "@/app/api/events/types";
import { fr } from "date-fns/locale/fr";
import { dateFnsLocalizer } from "react-big-calendar";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

export const eventPropGetter = (event: Event) => (
  {
    style: {
      backgroundColor: COLORS.tags[event.tag || 'ACTIVITE'].background,
      border: 'none',
      borderRadius: '0',
    }
  }
)

export const FORMATS = {
  dayFormat: `EEEE dd/MM`,
}

export const LOCALES = {
  'fr': fr,
}

export const LOCALIZER = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: LOCALES,
})