import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewEventForm } from "./NewEventForm";
import { VacationWithEvents } from "@/app/api/vacations/types";
import { NewEvent, UpdateEvent } from "@/app/api/events/types";

type NewEventDialogProps = {
  open: boolean,
  onClose: () => void,
  vacations: VacationWithEvents[],
  vacation: VacationWithEvents,
  event?: Partial<NewEvent> | UpdateEvent,
}

export default function NewEventDialog({
  open,
  onClose,
  vacations,
  vacation,
  event,
}: NewEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel événement</DialogTitle>
        </DialogHeader>
        <NewEventForm vacation={vacation} vacations={vacations} event={event} toggleOpen={onClose}/>
      </DialogContent>
    </Dialog>
  )
}