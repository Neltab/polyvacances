"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fr } from "date-fns/locale/fr"

type DateRangePickerProps = {
  value: DateRange | undefined
  onChange: (range?: DateRange) => void
}

export function DateRangePicker({
  value,
  onChange,
}: DateRangePickerProps) {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value?.to ? (
              <>
                {format(value.from, "dd LLLL y", {locale: fr})} -{" "}
                {format(value.to, "dd LLLL y", {locale: fr})}
              </>
            ) : (
              format(value.from, "dd LLLL y", {locale: fr})
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          locale={fr}
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={{
            from: value?.from!,
            to: value?.to,
          }}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
