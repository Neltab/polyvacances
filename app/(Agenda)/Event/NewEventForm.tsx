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

export const NewEventPopup = () => {
  const { vacations } = useContext(VacationContext);
  const queryClient = useQueryClient();

  const createEventMutation = useCreateEvent(queryClient);

  return (
    <div className="event-modal" style={{backgroundColor: 'white'}}>
      <div className='event-text-container'>
        <h2>Nouvel évènement</h2>
      </div>
      <form className='new-event-form' action={createEventMutation.mutate}>
        <TextField select label="Vacances" name='vacationId'>
          {vacations.map((vacation) => (
            <MenuItem key={vacation.id} value={vacation.id}>{vacation.location}</MenuItem>
          ))}
        </TextField>
        <TextField type="text" label="Titre" name="title" />
        <TextField multiline label="Description" name="description"/>
        <TextField type="text" label="Endroit" name="location" />
        <div className="new-event-form-datetime-group">
          <DateTimePicker label="Début" name="start"/>
          <DateTimePicker label="Fin" name="end"/>
        </div>
        <TextField select label="Type d'évènement" name='tag'>
          {Object.keys(tag).map((tag) => (
            <MenuItem key={tag} value={tag}>{tag.toLowerCase()}</MenuItem>
          ))}
        </TextField>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}