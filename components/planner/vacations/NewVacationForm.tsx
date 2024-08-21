'use client'

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useGetUsers } from '@/app/api/auth/user/Providers/client';
import { VacationSchema, vacationSchema } from '@/app/api/vacations/Providers/validation';
import { useCreateVacation } from '@/app/api/vacations/Providers/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/dateRangePicker';
import { Button } from '@/components/ui/button';

type NewVacationPopupProps = {
  toggleOpen: () => void,
}

const NewVacationForm = ({ toggleOpen }: NewVacationPopupProps) => {
  const form = useForm<VacationSchema>({
    resolver: zodResolver(vacationSchema)
  });
  
  const { data: users } = useGetUsers();

  const queryClient = useQueryClient();
  const createVacationMutation = useCreateVacation(queryClient);

  const onSubmit: SubmitHandler<VacationSchema> = (data) => {
    createVacationMutation.mutate(data, {
      onSuccess: () => { toggleOpen() }
    })
  }

  if (!users) return (
    <div>Loading...</div>
  );

  const userOptions = users.map((user) => ({value: user.id, label: user.name}));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center">

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre *</FormLabel>
              <FormControl>
                <Input placeholder="Italie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        {/* <Controller name="participants" control={control} render={({field}) => (
          <Select 
            placeholder="Participants"
            isMulti
            styles={{menu: (provided) => ({...provided, zIndex: 9999})}}
            options={userOptions}
            {...field}
          />
        )}/> */}

{/* 
        <Controller name="location" control={control} render={({field, fieldState: {invalid, error}}) => (
          <TextField required type="text" label="Endroit" {...field} error={invalid} helperText={error?.message} />
        )}/> */}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre *</FormLabel>
              <FormControl>
                <DateRangePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="new-vacation-form-datetime-group">
          <Controller name="date.from" control={control} render={({field, fieldState: {invalid, error}}) => (
            <DatePicker
              label="Début"
              {...field}
              slotProps={{
                textField: {
                  error: invalid,
                  helperText: error?.message,
                  required: true,
                },
              }}
            />
          )}/>
          <Controller name="date.to" control={control} render={({field, fieldState: {invalid, error}}) => (
            <DatePicker 
              label="Fin"
              {...field}
              slotProps={{
                textField: {
                  error: invalid,
                  helperText: error?.message,
                  required: true,
                },
              }}
            />
          )}/>
        </div> */}
        <Button type="submit" className="flex-none">Envoyer</Button>
      </form>
    </Form>
  );
}

export default NewVacationForm;