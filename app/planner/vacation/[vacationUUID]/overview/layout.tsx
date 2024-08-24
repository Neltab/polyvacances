import Card from '@/components/ui/Card';

type OverviewProps = {
  children: React.ReactNode;
  participants: React.ReactNode;
  planning: React.ReactNode;
  checklists: React.ReactNode;
  expenses: React.ReactNode;
}

export default async function Layout({
  children,
  participants,
  planning,
  checklists,
  expenses,
}: OverviewProps) {
  return (
    <>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex flex-3">
          <Card>
            {planning}
          </Card>
        </div>
        <div className="flex flex-1">
          <Card>
            {participants}
          </Card>
        </div>
      </div>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex flex-1">
          <Card>
            {checklists}
          </Card>
        </div>
        <div className="flex flex-1">
          <Card>
            {expenses}
          </Card>
        </div>
      </div>
    {children}
    </>
  )
}