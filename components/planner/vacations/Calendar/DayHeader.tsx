import { capitalize } from "@/lib/utils";

export default function DayHeader({label}: {label: string}) {
  const [day, date] = label.split(' ');
  return (
    <div className="text-left self-start">
      <h1 className="text-primary-darkest text-lg">{capitalize(day)}</h1>
      <h2 className="text-grey-light text-sm">{date}</h2>
    </div>
  ) 
}