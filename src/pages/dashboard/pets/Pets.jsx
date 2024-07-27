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

  // Fetch pet data
  const fetchPetData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8112/pets/list/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPetData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  useEffect(() => {
    fetchPetData();
  }, [uid]);

 
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  // Handle successful addition or update of pet
  const handlePetUpdate = () => {
    fetchPetData();
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
