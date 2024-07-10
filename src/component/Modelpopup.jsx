import React from 'react'
import popupcss from "./css/modelpopup.module.css"
function Modelpopup({ children }) {
  return (
    <div className={popupcss.popup_container}>
    <div className={`${popupcss.popup} ${popupcss.animate}`}>
      {children}
    </div>
  </div>
  )
}

export default Modelpopup
