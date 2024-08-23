'use client'

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useGetUsers } from '@/app/api/auth/user/Providers/client';
import { VacationSchema, vacationSchema } from '@/app/api/vacations/Providers/validation';
import { useCreateVacation, useUpdateVacation } from '@/app/api/vacations/Providers/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/dateRangePicker';
import { Button } from '@/components/ui/button';
import { Vacation } from "@/app/api/vacations/types";

type NewVacationPopupProps = {
  toggleOpen: () => void,
  vacation?: Vacation,
}

const NewVacationForm = ({ 
  toggleOpen,
  vacation,
}: NewVacationPopupProps) => {
  const form = useForm<VacationSchema>({
    defaultValues: vacation ? {
      location: vacation.location,
      participants: vacation.participants.map(participant => ({value: participant.id, label: participant.name})),
      date: {from: vacation.startDate, to: vacation.endDate},
    } : undefined,
    resolver: zodResolver(vacationSchema),
  });
  
  const { data: users } = useGetUsers();

  const queryClient = useQueryClient();
  const createVacationMutation = useCreateVacation(queryClient);
  const updateVacationMutation = useUpdateVacation(queryClient);

  const onSubmit: SubmitHandler<VacationSchema> = (data) => {
    if (vacation) {
      updateVacationMutation.mutate({...data, id: vacation.id}, {
        onSuccess: () => { toggleOpen() }
      });
      return;
    }

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

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dates *</FormLabel>
              <FormControl>
                <DateRangePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="flex-none">Envoyer</Button>
      </form>
    </Form>
  );
}

export default NewVacationForm;