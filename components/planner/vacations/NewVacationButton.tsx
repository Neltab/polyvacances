'use client'

import useToggleState from "@/components/hooks/useToggleState"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa6"
import NewVacationForm from "./NewVacationForm";

export default function NewVacationButton() {
  const [open, toggleOpen] = useToggleState(false);

  return (
    <>
      <button className="bg-white rounded-full p-2" onClick={toggleOpen}>
        <FaPlus className="fill-[#516CF7]" size={28}/>
      </button>
      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvel événement</DialogTitle>
          </DialogHeader>
          <NewVacationForm toggleOpen={toggleOpen}/>
        </DialogContent>
      </Dialog>
    </>

  )
}