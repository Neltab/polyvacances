'use client'

import useToggleState from "@/components/hooks/useToggleState"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa6"
import NewVacationForm from "./NewVacationForm";
import { Button } from "@/components/ui/button";

export default function NewVacationButton() {
  const [open, toggleOpen] = useToggleState(false);

  return (
    <>
      <Button onClick={toggleOpen}>
        Nouvelles vacances
      </Button>
      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelles vacances</DialogTitle>
          </DialogHeader>
          <NewVacationForm toggleOpen={toggleOpen}/>
        </DialogContent>
      </Dialog>
    </>

  )
}