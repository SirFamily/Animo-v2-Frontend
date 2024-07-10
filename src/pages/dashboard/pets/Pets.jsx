import React, { useState } from "react";
import Menu from "../../../menu/Menu";
import Petsadd from "./Pets_add";
function Pets() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <Menu />
      pet
      <div onClick={togglePopup}>
       เพิ่มสัตว์เลี้ยง
      </div>
      {isPopupOpen && <Petsadd onClose={togglePopup} />}
    </div>
  );
}

export default Pets;
