'use client'

import './style.css'
import { useQueryClient } from "@tanstack/react-query";
import { useCreateVacation } from "./Providers/client";

export default () => {
  const queryClient = useQueryClient();

  const createVacationMutation = useCreateVacation(queryClient);

  return (
    <div className="vacation-modal" style={{backgroundColor: 'white'}}>
      <div className='vacation-text-container'>
        <h2>Nouvelles vacances</h2>
      </div>
      <form className='new-vacation-form' action={createVacationMutation.mutate}>
        <input type="text" placeholder="Endroit" name="location" />
        <div className="new-vacation-form-datetime-group">
          <input type="date" name="startDate"/>
          <input type="date" name="endDate"/>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}