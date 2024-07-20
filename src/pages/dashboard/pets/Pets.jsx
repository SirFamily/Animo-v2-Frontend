import React, { useEffect,useState } from "react";
import Menu from "../../../menu/Menu";
import Petsadd from "./Pets_add";
import Petslist from "./Pets_list"
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

function Pets() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [petData, setPetData] = useState([]);
  const { user } = useAuth();
  const uid = user.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/pets/list/${uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPetData(response.data.data);  // Update to access the data properly
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    getData();
  }, [uid]);

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
      {isPopupOpen && <Petsadd onClose={togglePopup} setPetData={setPetData} />}

      <Petslist petData={petData} />
    </div>
  );
}

export default Pets;
