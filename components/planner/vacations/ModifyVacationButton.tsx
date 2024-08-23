'use client'

import useToggleState from "@/components/hooks/useToggleState"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MdEdit } from "react-icons/md"
import NewVacationForm from "./NewVacationForm";
import { Vacation } from "@/app/api/vacations/types";

type NewVacationButtonProps = {
  vacation?: Vacation,
}

export default function NewVacationButton({
  vacation,
}: NewVacationButtonProps) {
  const [open, toggleOpen] = useToggleState(false);

  return (
    <>
      <button className="bg-white rounded-full p-2" onClick={toggleOpen}>
        <MdEdit className="fill-[#516CF7]" size={28}/>
      </button>
      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier les vacances</DialogTitle>
          </DialogHeader>
          <NewVacationForm vacation={vacation} toggleOpen={toggleOpen}/>
        </DialogContent>
      </Dialog>
    </>

  )
}