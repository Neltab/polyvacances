import { getMyVacations } from "@/app/api/vacations/Providers/server";
import NewVacationButton from "@/components/planner/vacations/NewVacationButton";
import Card from "@/components/ui/Card";

export default async function PlannerPage() {
  const myVacations = await getMyVacations()
  const futureVacations = myVacations.filter(vacation => vacation.endDate > new Date())
  const pastVacations = myVacations.filter(vacation => vacation.endDate < new Date())

  if (myVacations.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">
        <h2>Vous n&apos;avez pas encore de vacances</h2>
        <NewVacationButton />
      </div>
    )
  }

  return (
    <div className="flex flex-row flex-1 gap-4">
      <Card className="flex-3">
        <div className="flex flex-1 flex-row">
          <h2>Upcoming Vacations</h2>
        </div>
        <div className="flex flex-1 flex-row">
          <h2>Past Vacations</h2>
        </div>
      </Card>
      <Card className="flex-1">
        <h2>Articles</h2>
      </Card>
    </div>
  )
}