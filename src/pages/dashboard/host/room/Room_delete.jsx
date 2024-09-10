import React from 'react';
import Modelpopup from "../../../../component/Modelpopup";
import axios from 'axios';
import styles from './Css/roomdelete.module.css'; 

function Room_delete({ selectedRoom, onClose, handleRoomUpdate }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Perform DELETE request to delete room by ID
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/room/delete/${selectedRoom.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      
      // If the response is successful
      if (response.status === 200) {
        alert("ลบห้องสำเร็จ");
        handleRoomUpdate(); // Trigger host update to refresh the room list
        onClose(); // Close the modal after successful deletion
      }
    } catch (error) {
      // Handle possible errors
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
