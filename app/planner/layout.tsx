import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VacationList from "../../components/planner/VacationList";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="shadow flex flex-col p-4 gap-4">
        <Skeleton className="h-7 w-[250px]" />
        <Skeleton className="h-7 w-[250px]" />
        <Skeleton className="h-7 w-[250px]" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Mes vacances</AccordionTrigger>
            <AccordionContent>
              <VacationList />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {children}
    </div>
  )
}