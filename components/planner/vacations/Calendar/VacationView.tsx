import PropTypes from 'prop-types'
// @ts-ignore
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import "./VacationView.css"
import DayHeader from './DayHeader'

interface VacationViewProps {
  date: Date
  localizer: any
  min?: Date
  max?: Date
  scrollToTime?: Date
  components: any
}

export default function getVacationView(start: Date, end: Date) {
  function VacationView({
    date,
    localizer,
    min = new Date(1972, 0, 1, 7, 0, 0),
    max = new Date(1972, 0, 1, 23, 0, 0),
    scrollToTime = new Date(1972, 0, 1, 0, 0, 0),
    components,
    ...props
  }: VacationViewProps) {
    const currRange = localizer.range(start, end);

    return (
      <TimeGrid
        date={date}
        eventOffset={15}
        localizer={localizer}
        max={max}
        min={min}
        range={currRange}
        scrollToTime={scrollToTime}
        components={{
          ...components,
          header: DayHeader,
        }}
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

  return VacationView
}