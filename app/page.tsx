import 'moment/locale/fr';
import VacationCalendar from "@/app/(Agenda)/Vacation/VacationCalendar";
import { VacationProvider } from './(Agenda)/Vacation/Providers/context';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main>
      <VacationProvider>
        <VacationCalendar />
      </VacationProvider>
    </main>
  );
}
