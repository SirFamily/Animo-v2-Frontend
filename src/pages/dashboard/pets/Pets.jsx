import React, { useState } from "react";
import Menu from "../../../menu/Menu";
import Petsadd from "./Pets_add";
import Petslist from "./Pets_list";
import useAuth from "../../../hooks/useAuth";
import csslayer from "../dashboardcss/dashlayer.module.css";
import axios from "axios";

function Pets() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [petData, setPetData] = useState([]);
  const { user } = useAuth();
  const uid = user.id;

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer}>
        <div className={csslayer.container_layer_top}>
          <div className={csslayer.container_in_top}></div>
          <div className={csslayer.container_in_top_tow} onClick={togglePopup}>
            เพิ่มสัตว์เลี้ยง
          </div>
        </div>
        <div className={csslayer.container_layer_buttom}>
          {isPopupOpen && (
            <Petsadd onClose={togglePopup} setPetData={setPetData} />
          )}
          <Petslist uid={uid} setPetData={setPetData} />
        </div>
      </div>
    </div>
  );
}

export default Pets;
