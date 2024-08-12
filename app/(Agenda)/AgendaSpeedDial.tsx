'use client'

import { useState } from "react";
import Popup from '@/app/UI/Popup/Popup'
import { NewEventPopup } from '../(Agenda)/Event/NewEventForm';
import { TbBeach } from "react-icons/tb";
import { MdEvent, MdArticle } from "react-icons/md";
import NewVacationPopup from '../(Agenda)/Vacation/NewVacationForm';
import NewArticleForm from '../blog/NewArticleForm';
import SpeedDial from "../UI/SpeedDial/SpeedDial";
import useToggleState from "../hooks/useToggleState";

export default () => {

  const [eventPopupOpen, toggleEventPopupOpen] = useToggleState(false);
  const [vacationPopupOpen, toggleVacationPopupOpen] = useToggleState(false);
  const [articlePopupOpen, toggleArticlePopupOpen] = useToggleState(false);

  const actions = [
    { icon: <TbBeach />, name: 'Nouvelles vacances', onClick: () => toggleVacationPopupOpen(), open: vacationPopupOpen, popup: <NewVacationPopup toggleOpen={toggleVacationPopupOpen} /> },
    { icon: <MdEvent />, name: 'Nouvel évènement', onClick: () => toggleEventPopupOpen(), open: eventPopupOpen, popup: <NewEventPopup toggleOpen={toggleEventPopupOpen}/> },
    { icon: <MdArticle />, name: 'Nouvel article de blog', onClick: () => toggleArticlePopupOpen(), open: articlePopupOpen, popup: <NewArticleForm /> },
  ];

  return (
    <>
      <SpeedDial actions={actions} />
      {
        actions.map(action => (
          <Popup title={action.name} open={action.open} onClose={action.onClick}>
            {action.popup}
          </Popup> 
        ))
      }
    </>
  );
}