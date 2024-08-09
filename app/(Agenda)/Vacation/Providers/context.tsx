'use client'

import { createContext, useCallback, useEffect, useState } from 'react';
import { VacationWithEvents } from '../types';
import { useGetVacationsWithEvents } from './client';

type VacationContextType = {
  vacations: VacationWithEvents[];
  vacationIndex: number;
  vacation: VacationWithEvents | null;
  setVacationFromIndex: (index: number) => void;
}

export const VacationContext = createContext<VacationContextType>({
  vacations: [],
  vacationIndex: 0,
  vacation: null,
  setVacationFromIndex: () => {},
});

type VacationProviderProps = {
  children: React.ReactNode;
}

export const VacationProvider = ({ children }: VacationProviderProps) => {
  const [vacation, setVacation] = useState<VacationWithEvents | null>(null);
  const [vacationIndex, setVacationIndex] = useState(0);
  const { data: vacations, status } = useGetVacationsWithEvents();

  const setVacationFromIndex = useCallback((index: number) => {
    if (!vacations) {
      return;
    }

    if (index < 0 || index >= vacations.length) {
      return;
    }
    setVacation(vacations[index]);
    setVacationIndex(index);
  }, [vacations]);

  useEffect(() => {
    if (vacations) {
      const lastIndex = vacations.length - 1;
      setVacationFromIndex(lastIndex);
    }
  }, [vacations, setVacationFromIndex]);
  
  if (status !== 'success') {
    return <div>Loading...</div>
  }

  return (
    <VacationContext.Provider value={{ vacations, vacationIndex, vacation, setVacationFromIndex }}>
      {children}
    </VacationContext.Provider>
  );
};