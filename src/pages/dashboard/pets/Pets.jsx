import React, { useState } from "react";
import Menu from "../../../menu/Menu";
import Petsadd from "./Pets_add";
import Petslist from "./Pets_list"

function Pets() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <Menu />
      <h1>pet</h1>
      <button onClick={togglePopup}>
       เพิ่มสัตว์เลี้ยง
      </button>
      {isPopupOpen && <Petsadd onClose={togglePopup} />}

      <Petslist />
    </div>
  );
}

export default Pets;
