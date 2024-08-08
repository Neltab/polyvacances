import React, {useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
// @ts-ignore
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import { VacationContext } from './Providers/context'

interface VacationViewProps {
  date: Date
  localizer: any
  min?: Date
  max?: Date
  scrollToTime?: Date
  components: any
}

export default function VacationView({
  date,
  localizer,
  min = new Date(1972, 0, 1, 7, 0, 0),
  max = new Date(1972, 0, 1, 23, 0, 0),
  scrollToTime = new Date(1972, 0, 1, 0, 0, 0),
  ...props
}: VacationViewProps) {
  const { vacation } = useContext(VacationContext)
  const currRange = useMemo(
    () => vacation ? localizer.range(vacation.startDate, vacation.endDate) : [],
    [vacation, localizer]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

VacationView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

VacationView.range = () => {
  return new Date()
}

VacationView.navigate = () => {
  return new Date()
}

VacationView.title = () => {
  return 'Vacation'
}