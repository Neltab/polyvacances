import { useState, ReactNode } from 'react';
import './SpeedDial.css';
import { FiPlus } from "react-icons/fi";

type SpeedDialProps = {
  actions: {
    icon: ReactNode,
    name: string,
    onClick: () => void
  }[]
}

export default ({ actions }: SpeedDialProps) => {
  const [open, setOpen] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

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
            <button key={index} className="speed-dial-action" onClick={action.onClick}>
              {action.icon}
              <span className="speed-dial-label">{action.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};