import React from 'react';
import Modelpopup from "../../../../component/Modelpopup";
import axios from 'axios';
import styles from './Css/roomdelete.module.css'; 

function Room_delete({ selectedRoom, onClose, handleRoomUpdate }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/room/delete/${selectedRoom.id}`);
      
      if (response.status === 200) {
        alert("ลบห้องสำเร็จ");
        handleRoomUpdate(); 
        onClose(); 
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("ไม่พบห้องที่จะลบ");
      } else {
        alert("เกิดข้อผิดพลาดในการลบห้อง");
      }
      console.error("Failed to delete the room:", error);
    }
  };
console.log(selectedRoom)
  return (
    <Modelpopup>
      <div className={styles.popup}>
        <h2 className={styles.header}>คำเตือน</h2>
        <p className={styles.message}>
          คุณต้องการลบห้อง <b>{selectedRoom.name}</b> ใช่หรือไม่
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
export default Room_delete;
