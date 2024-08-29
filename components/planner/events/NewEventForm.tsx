'use client'

import { tag } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema, getCreateEventSchema } from "@/app/api/events/Providers/validation";
import { Vacation } from "@/app/api/vacations/types";
import { NewEvent, UpdateEvent } from "@/app/api/events/types";
import { useCreateEvent, useUpdateEvent } from "@/app/api/events/Providers/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type NewEventPopupProps = {
  vacation: Vacation,
  toggleOpen: () => void,
  event?: Partial<NewEvent> | UpdateEvent,
}

export const NewEventForm = ({ toggleOpen, event, vacation }: NewEventPopupProps) => {

  const eventSchema = getCreateEventSchema(vacation);

  const form = useForm<CreateEventSchema>({
    defaultValues: event ? {
      vacationId: event.vacationId,
      title: event.title,
      description: event.description || undefined,
      tag: event.tag || undefined,
      start: event.start,
      end: event.end,
      location: event.location,
    } : undefined,
    resolver: zodResolver(eventSchema)
  });

  const queryClient = useQueryClient();

  const createEventMutation = useCreateEvent(queryClient);
  const updateEventMutation = useUpdateEvent(queryClient);

  const isUpdate = event && "id" in event;
  const usedMutation = isUpdate ? updateEventMutation : createEventMutation;
  
  const onSubmit: SubmitHandler<CreateEventSchema> = (data) => {
    if (isUpdate) {
      updateEventMutation.mutate({...data, id: event.id}, {
        onSuccess: () => { toggleOpen() }
      });
      return;
    }

    createEventMutation.mutate(data, {
      onSuccess: () => { toggleOpen() }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center">
        <Input type="hidden" {...form.register('vacationId')} />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre *</FormLabel>
              <FormControl>
                <Input placeholder="Italie 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Un petit voyage en Italie..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endroit *</FormLabel>
              <FormControl>
                <Input placeholder="Rome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <Controller name="start" control={form.control} render={({field, fieldState: {invalid, error}}) => (
            <DateTimePicker 
              label="Début" 
              minDate={vacation.startDate} maxDate={vacation.endDate} 
              {...field} 
              value={field.value}
              slotProps={{
                popper: {
                  style: { pointerEvents: 'auto' }
                },
                textField: {
                  error: invalid,
                  helperText: error?.message,
                  required: true,
                },
              }}
            />
          )}/>
          <Controller name="end" control={form.control} render={({field, fieldState: {invalid, error}}) => (
            <DateTimePicker 
              label="Fin" 
              minDate={vacation.startDate} maxDate={vacation.endDate} 
              {...field} 
              value={field.value}
              slotProps={{
                popper: {
                  style: { pointerEvents: 'auto' }
                },
                textField: {
                  error: invalid,
                  helperText: error?.message,
                  required: true,
                },
              }}
            />
          )}/>
        </div>

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d&apos;activité *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "TRANSPORT"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Type d'évènement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(tag).map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag.toLowerCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button status={usedMutation.status} type="submit" className="flex-none">Envoyer</Button>
      </form>
    </Form>
  )
}