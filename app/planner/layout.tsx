import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VacationList from "../../components/planner/VacationList";
import { Skeleton } from "@/components/ui/skeleton";
import { TbBeach } from "react-icons/tb";
import SignInButton from "@/components/planner/SignInButton";
import { getServerSession } from "next-auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="flex flex-row min-h-screen">
        <div className="shadow flex flex-col p-4 gap-4 w-[256px]">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
          <div className="flex flex-col items-center max-w-full gap-4">
            <h1>Connectez vous pour accéder à vos vacances</h1>
            <SignInButton />
          </div>
        </div>
        {children}
      </div>
    )
  }
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