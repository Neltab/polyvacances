import React, { useState } from 'react';
import './SpeedDial.css';
import { FiPlus } from "react-icons/fi";
import Popup from 'reactjs-popup';
import { NewEventPopup } from '../(Agenda)/Event/NewEventPopup';

const actions = [
  { icon: '✉️', name: 'Email' },
  { icon: '📞', name: 'Call' },
  { icon: '🗺️', name: 'Navigate' },
];

const SpeedDial = () => {
  const [open, setOpen] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);

  const handleToggle = () => {
    setForceOpen(!forceOpen);
  };

  const isOpen = forceOpen || open;
  const openedClassName = isOpen ? 'speed-dial-button-opened' : '';

  return (
    <div className="speed-dial" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
      <button className={`speed-dial-button ${openedClassName}`} onClick={handleToggle}>
        <FiPlus color={"#ffffff"} size={23}/>
      </button>
      {isOpen && (
        <div className="speed-dial-actions">
          {actions.map((action, index) => (
            <button key={index} className="speed-dial-action" onClick={() => setPopupOpen(true)}>
              {action.icon}
              <span className="speed-dial-label">{action.name}</span>
            </button>
          ))}
        </div>
      )}
      <Popup open={popupOpen} closeOnDocumentClick onClose={() => setPopupOpen(false)}>
        <NewEventPopup />
      </Popup>
    </div>
  );
};

export default SpeedDial;