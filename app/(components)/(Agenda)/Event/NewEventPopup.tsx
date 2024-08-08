'use client'

import { tag } from "@prisma/client";
import './style.css'
import { useQueryClient } from "@tanstack/react-query";
import { useCreateEvent } from "./Providers/client";
import { useContext } from "react";
import { VacationContext } from "../Vacation/Providers/context";

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
        <select name='vacationId'>
          {vacations.map((vacation) => (
            <option key={vacation.id} value={vacation.id}>{vacation.location}</option>
          ))}
        </select>
        <input type="text" placeholder="Titre" name="title" />
        <textarea placeholder="Description" name="description"/>
        <input type="text" placeholder="Endroit" name="location" />
        <div className="new-event-form-datetime-group">
          <input type="datetime-local" name="start"/>
          <input type="datetime-local" name="end"/>
        </div>
        <select name='tag'>
          {Object.keys(tag).map((tag) => (
            <option key={tag} value={tag}>{tag.toLowerCase()}</option>
          ))}
        </select>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}