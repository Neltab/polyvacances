import Popup from "reactjs-popup"
import { PopupProps as ReactJSPopupPros } from "reactjs-popup/dist/types"
import "./Popup.css"

type PopupProps = ReactJSPopupPros & {
  title: string,
}

export default ({
  title,
  children,
  ...props
}: PopupProps) => (
  <Popup nested {...props}>
    <div className="popup-modal" style={{backgroundColor: 'white'}}>
      <div className='popup-text-container'>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  </Popup>
)