import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewEventForm } from "./NewEventForm";
import { VacationWithEvents } from "@/app/api/vacations/types";
import { NewEvent, UpdateEvent } from "@/app/api/events/types";

type NewEventDialogProps = {
  open: boolean,
  onClose: () => void,
  vacation: VacationWithEvents,
  event?: Partial<NewEvent> | UpdateEvent,
}

export default function NewEventDialog({
  open,
  onClose,
  vacation,
  event,
}: NewEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle activité</DialogTitle>
        </DialogHeader>
        <NewEventForm vacation={vacation} event={event} toggleOpen={onClose}/>
      </DialogContent>
    </Dialog>
  )
}