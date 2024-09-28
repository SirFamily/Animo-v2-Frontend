import React, { useEffect, useState } from "react";
import Menu from "../../../menu/Menu";
import Petsadd from "./Pets_add";
import Petslist from "./Pets_list";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import csslayer from "../dashboardcss/dashlayer.module.css";

function Pets() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [petData, setPetData] = useState([]);
  const { user } = useAuth();
  const uid = user.id;

  const getPetData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/list/${uid}`, {
      });
      setPetData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error pet data:", error);
    }
  };

  useEffect(() => {
    getPetData();
  }, []);

 
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handlePetUpdate = () => {
    getPetData();
  };

  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer}>
        <div className={csslayer.container_layer_top}>
          <div className={csslayer.container_in_top}></div>
          <div className={csslayer.container_in_top_tow} onClick={togglePopup}><h3>เพิ่มสัตว์เลี้ยง</h3></div>
        </div>
        <div className={csslayer.container_layer_buttom}>
          {isPopupOpen && <Petsadd onClose={togglePopup} setPetData={handlePetUpdate} />}
          <Petslist petData={petData}  setPetData={handlePetUpdate}/>
        </div>
      </div>
    </div>
  );
}

export default Pets;
