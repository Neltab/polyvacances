'use client'

import './style.css'
import { useQueryClient } from "@tanstack/react-query";
import { useCreateVacation } from "./Providers/client";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NewVacation, Vacation, vacationSchema } from './types';

type NewVacationPopupProps = {
  toggleOpen: () => void,
}

export default ({ toggleOpen }: NewVacationPopupProps) => {
  const { control, handleSubmit } = useForm<Vacation | NewVacation>({
    resolver: zodResolver(vacationSchema)
  });
  
  const queryClient = useQueryClient();

  const createVacationMutation = useCreateVacation(queryClient);

  const onSubmit: SubmitHandler<NewVacation> = (data) => createVacationMutation.mutate(data, {
    onSuccess: () => { toggleOpen() }
  })

  return (
    <form className='new-vacation-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller name="location" control={control} render={({field}) => (
        <TextField type="text" label="Endroit" {...field} />
      )}/>

      <div className="new-vacation-form-datetime-group">
        <Controller name="startDate" control={control} render={({field}) => (
          <DatePicker label="Début" {...field}/>
        )}/>
        <Controller name="endDate" control={control} render={({field}) => (
          <DatePicker label="Fin" {...field}/>
        )}/>
      </div>
      <Button variant="contained" type="submit">Ajouter</Button>
    </form>
  );
}