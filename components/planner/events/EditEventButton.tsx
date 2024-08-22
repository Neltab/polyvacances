import useToggleState from "@/components/hooks/useToggleState";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { NewEventForm } from "./NewEventForm";
import { Vacation } from "@/app/api/vacations/types";
import { Event } from "@/app/api/events/types";
import { MdEdit } from "react-icons/md";

type EditEventButtonProps = {
  event: Event,
  vacation: Vacation,
}

export default function EditEventButton({
  event,
  vacation,
}: EditEventButtonProps) {
  const [open, toggleOpen] = useToggleState(false);
  return (
    <>
      <button className="bg-white rounded-full p-2" onClick={toggleOpen}>
        <MdEdit size={28}/>
      </button>
      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-xl font-bold">Modifier l&apos;activité</h2>
          </DialogHeader>
          <NewEventForm event={event} vacation={vacation} toggleOpen={toggleOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}