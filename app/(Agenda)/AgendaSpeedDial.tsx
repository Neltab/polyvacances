import { useState, useMemo } from "react";
import Popup from 'reactjs-popup';
import { NewEventPopup } from '../(Agenda)/Event/NewEventForm';
import { TbBeach } from "react-icons/tb";
import { MdEvent, MdArticle } from "react-icons/md";
import NewVacationPopup from '../(Agenda)/Vacation/NewVacationForm';
import NewArticleForm from '../blog/NewArticleForm';
import SpeedDial from "../UI/SpeedDial";

export default () => {

  const [eventPopupOpen, setEventPopupOpen] = useState(false);
  const [vacationPopupOpen, setVacationPopupOpen] = useState(false);
  const [articlePopupOpen, setArticlePopupOpen] = useState(false);

  const actions = useMemo(() => [
    { icon: <TbBeach />, name: 'Nouvelles vacances', onClick: () => setVacationPopupOpen(true) },
    { icon: <MdEvent />, name: 'Nouvel évènement', onClick: () => setEventPopupOpen(true) },
    { icon: <MdArticle />, name: 'Nouvel article de blog', onClick: () => setArticlePopupOpen(true) },
  ], [setEventPopupOpen]);

  return (
    <>
      <SpeedDial actions={actions} />
      <Popup open={eventPopupOpen} closeOnDocumentClick onClose={() => setEventPopupOpen(false)}>
        <NewEventPopup />
      </Popup>
      <Popup open={vacationPopupOpen} closeOnDocumentClick onClose={() => setVacationPopupOpen(false)}>
        <NewVacationPopup />
      </Popup>
      <Popup open={articlePopupOpen} closeOnDocumentClick onClose={() => setArticlePopupOpen(false)}>
        <NewArticleForm />
      </Popup>
    </>
  );
}