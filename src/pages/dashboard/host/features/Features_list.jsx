import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Css/hostlist.module.css";
import Features_add from "./Features_add";
import Features_delete from "./Features_delete";
import Features_edit from "./Features_edit";

function Features_list() {
  const [features, setFeatures] = useState([]);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/features/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeatures(response.data.data); // ใช้ response.data.data
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const toggleAddPopup = () => setAddPopupOpen(!isAddPopupOpen);
  const toggleEditPopup = (feature) => {
    setSelectedFeature(feature);
    setEditPopupOpen(!isEditPopupOpen);
  };
  const toggleDeletePopup = (feature) => {
    setSelectedFeature(feature);
    setDeletePopupOpen(!isDeletePopupOpen);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>บริการเสริม</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>สถานะ</th>
            <th>ราคา</th>
            <th>ตั้งค่า</th>
          </tr>
        </thead>
        <tbody>
          {features.length > 0 ? (
            features.map((feature) => (
              <tr key={feature.id}>
                <td>{feature.name}</td>
                <td>{feature.status}</td>
                <td>${feature.price}</td>
                <td>
                  <div
                    className={styles.editLink}
                    onClick={() => toggleEditPopup(feature)}
                  >
                    แก้ไข
                  </div>
                  <div
                    className={styles.deleteLink}
                    onClick={() => toggleDeletePopup(feature)}
                  >
                    ลบ
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">ไม่มีบริการเสริมที่ใช้พร้อมใช้งาน</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.button_container}>
        <button className={styles.bt} onClick={toggleAddPopup}>
         เพิ่มบริการเสริม
        </button>
      </div>
      {/* Popups for add, edit, delete */}
      {isAddPopupOpen && (
        <Features_add
          onClose={toggleAddPopup}
          refreshFeatures={fetchFeatures}
        />
      )}
      {isEditPopupOpen && (
        <Features_edit
          feature={selectedFeature}
          onClose={toggleEditPopup}
          refreshFeatures={fetchFeatures}
        />
      )}
      {isDeletePopupOpen && (
        <Features_delete
          feature={selectedFeature}
          onClose={toggleDeletePopup}
          refreshFeatures={fetchFeatures}
        />
      )}
    </div>
  );
}

export default Features_list;
