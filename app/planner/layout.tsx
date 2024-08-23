import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VacationList from "../../components/planner/VacationList";
import { Skeleton } from "@/components/ui/skeleton";
import { TbBeach } from "react-icons/tb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="shadow flex flex-col p-4 gap-4 w-[256px]">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex flex-row gap-2 items-center">
                <TbBeach />
                Mes vacances
              </div>
            </AccordionTrigger>
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