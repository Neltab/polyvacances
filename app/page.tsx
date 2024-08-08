import 'moment/locale/fr';
import VacationCalendar from "@/app/(components)/(Agenda)/Vacation/VacationCalendar";
import { VacationProvider } from './(components)/(Agenda)/Vacation/Providers/context';
import { MardkdownEditor } from './(components)/blog/MarkdownEditor';

export default async function Home() {

  return (
    <main>
      <VacationProvider>
        <VacationCalendar />
        <MardkdownEditor />
      </VacationProvider>
    </main>
  );
}
