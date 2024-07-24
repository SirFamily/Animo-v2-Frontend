import React, { useEffect, useState } from "react";
import Menu from "../../../menu/Menu";
import Petsadd from "./Pets_add";
import Petslist from "./Pets_list";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import csslayer from "../dashboardcss/dashlayer.module.css"
function Pets() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [petData, setPetData] = useState([]);
  const { user } = useAuth();
  const uid = user.id;

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/pets/list/${uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (isMounted) {
          setPetData(response.data.data); // Update to access the data properly
          console.log(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching pet data:", error);
        }
      }
    };

    getData();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when the component unmounts
    };
  }, [uid]);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer}>
        <div className={csslayer.container_layer_top}>
        <div className={csslayer.container_in_top}></div>
        <div className={csslayer.container_in_top_tow}  onClick={togglePopup}>เพิ่มสัตว์เลี้ยง</div>
        </div>
        <div className={csslayer.container_layer_buttom}>
      {isPopupOpen && <Petsadd onClose={togglePopup} setPetData={setPetData} />}
      <Petslist petData={petData} />
        </div>
      </div>
      
    </div>
  );
}

export default Pets;
