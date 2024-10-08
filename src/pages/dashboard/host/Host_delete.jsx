import React from "react";
import Modelpopup from "../../../component/Modelpopup";
import styles from "./Css/้hostdelete.module.css";
import axios from "axios";

function Host_delete({ selectedHost, onClose, handleHostUpdate ,handleHostUpdateData}) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/host/delete/${selectedHost}`
      );

      if (response.status === 200) {
        handleHostUpdate();
        handleHostUpdateData();
        onClose();
        console.log(selectedHost);
        alert("ลบข้อมูลสถานที่พักสำเร็จแล้ว");
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
          คุณต้องการลบสถานที่พักใช่หรือไม่
        </p>
        {/* <b>{selectedHost}</b>  */}
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
