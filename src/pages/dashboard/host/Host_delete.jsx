import React from "react";
import Modelpopup from "../../../component/Modelpopup";
import styles from "./Css/้hostdelete.module.css";
import axios from "axios";

function Host_delete({ selectedHost, onClose, handleHostUpdate ,handleHostUpdateData}) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/host/delete/${selectedHost}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleHostUpdate();
        handleHostUpdateData();
        onClose();
        console.log(selectedHost);
        alert("ลบข้อมูลสัตว์เลี้ยงสำเร็จ");
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("ต้องลบห้องให้หมดก่อนจึงจะสามารถลบโฮสต์");
      } else {
        alert("เกิดข้อผิดพลาดในการลบโฮสต์ กรุณาลองใหม่อีกครั้ง");
      }
      onClose();
    }
  };

  return (
    <Modelpopup>
      <div className={styles.popup}>
        <h2 className={styles.header}>คำเตือน</h2>
        <p className={styles.message}>
          คุณต้องการลบสถานที่พัก <b>{selectedHost}</b> ใช่หรือไม่
        </p>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={handleDelete}
          >
            ลบ
          </button>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
          >
            ปิด
          </button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Host_delete;
