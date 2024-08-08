import React, { useContext } from 'react';
import { VacationContext } from './Providers/context';

const VacationToolbar = () => {

  const { vacationIndex, vacation, setVacationFromIndex } = useContext(VacationContext);

  const handleVacationChange = (indexDifference: number) => {
    const newIndex = vacationIndex + indexDifference;
    setVacationFromIndex(newIndex);
  };

  return (
    <div className="rbc-toolbar">
      <button className="rbc-btn-left" onClick={() => handleVacationChange(-1)}>
        &lt;
      </button>
      <span className="rbc-toolbar-label">Polyvacances {vacation?.startDate.getFullYear()} - {vacation?.location}</span>
      <button className="rbc-btn-right" onClick={() => handleVacationChange(1)}>
        &gt;
      </button>
    </div>
  );
}

export default VacationToolbar;