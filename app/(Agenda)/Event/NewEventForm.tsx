'use client'

import { tag } from "@prisma/client";
import './style.css'
import { useQueryClient } from "@tanstack/react-query";
import { useCreateEvent } from "./Providers/client";
import { useContext } from "react";
import { VacationContext } from "../Vacation/Providers/context";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from "@mui/material/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Event, eventSchema, NewEvent } from "./types";

type NewEventPopupProps = {
  toggleOpen: () => void,
}

export const NewEventPopup = ({ toggleOpen }: NewEventPopupProps) => {
  const { control, handleSubmit } = useForm<Event | NewEvent>({
    resolver: zodResolver(eventSchema)
  });

  const { vacations } = useContext(VacationContext);
  const queryClient = useQueryClient();

  const createEventMutation = useCreateEvent(queryClient);
  
  const onSubmit: SubmitHandler<NewEvent> = (data) => createEventMutation.mutate(data, {
    onSuccess: () => { toggleOpen() }
  })

  return (
    <form className='new-event-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller name="vacationId" control={control} render={({field}) => (
        <TextField select label="Vacances" {...field}>
          {vacations.map((vacation) => (
            <MenuItem key={vacation.id} value={vacation.id}>{vacation.location}</MenuItem>
          ))}
        </TextField>
      )}/>

      <Controller name="title" control={control} render={({field}) => (
        <TextField type="text" label="Titre" {...field} />
      )}/>

      <Controller name="description" control={control} render={({field}) => (
        <TextField multiline label="Description" {...field}/>
      )}/>

      <Controller name="location" control={control} render={({field}) => (
        <TextField type="text" label="Endroit" {...field} />
      )}/>

      <div className="new-event-form-datetime-group">
        <Controller name="start" control={control} render={({field}) => (
          <DateTimePicker label="Début" {...field}/>
        )}/>
        <Controller name="end" control={control} render={({field}) => (
          <DateTimePicker label="Fin" {...field}/>
        )}/>
      </div>
      <Controller name="tag" control={control} render={({field}) => (
        <TextField select label="Type d'évènement" {...field}>
          {Object.keys(tag).map((tag) => (
            <MenuItem key={tag} value={tag}>{tag.toLowerCase()}</MenuItem>
          ))}
        </TextField>
      )}/>

      <Button variant="contained" type="submit">Ajouter</Button>
    </form>
  );
}