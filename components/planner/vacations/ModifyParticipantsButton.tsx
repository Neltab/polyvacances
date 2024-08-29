'use client'

import useToggleState from "@/components/hooks/useToggleState"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MdEdit } from "react-icons/md"
import Select from 'react-select';
import { participantsSchema, ParticipantsSchema } from "@/app/api/vacations/Providers/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/app/api/auth/user/Providers/client";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateParticipants } from "@/app/api/vacations/Providers/client";
import { Participant } from "@/app/api/vacations/types";

type ModifyParticipantsButtonProps = {
  participants: Participant[],
  vacationUUID: string,
}

export default function ModifyParticipantsButton({
  participants,
  vacationUUID,
}: ModifyParticipantsButtonProps) {
  const form = useForm<ParticipantsSchema>({
    defaultValues: { participants: participants.map(participant => ({value: participant.id, label: participant.name})) },
    resolver: zodResolver(participantsSchema)
  });

  const [open, toggleOpen] = useToggleState(false);
  
  const { data: users } = useGetUsers();
  const queryClient = useQueryClient();
  const participantsMutation = useUpdateParticipants(queryClient, vacationUUID);

  const onSubmit: SubmitHandler<ParticipantsSchema> = (data) => {
    participantsMutation.mutate(data, {
      onSuccess: () => { toggleOpen() }
    })
  }

  if (!users) return (
    <div>Loading...</div>
  );

  const userOptions = users.map((user) => ({value: user.id, label: user.name}));

  return (
    <>
      <button className="bg-white rounded-full p-2" onClick={toggleOpen}>
        <MdEdit className="fill-[#516CF7]" size={28}/>
      </button>
      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participants</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center">
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participants *</FormLabel>
                    <Select 
                      placeholder="Participants"
                      isMulti
                      styles={{menu: (provided) => ({...provided, zIndex: 9999})}}
                      options={userOptions}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />              
              <Button status={participantsMutation.status} type="submit" className="flex-none">Envoyer</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>

  )
}