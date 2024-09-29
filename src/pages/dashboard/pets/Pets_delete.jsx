import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../component/Modelpopup';
import styles from './Css/petdelete.module.css';

function Pets_delete({ pet, onClose, setPetData }) {

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pets/delete/${pet.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPetData(); 
      onClose();
      alert("ลบข้อมูลสัตว์เลี้ยงสำเร็จ");
    } catch (err) {
      alert('Failed to delete the pet. Please try again.');
    }
  };

  return (
    <Modelpopup>
      <div className={styles.popup}>
        <h2 className={styles.header}>คำเตือน</h2>
        <p className={styles.message}>คุณต้องการลบน้อง <b>{pet.petName}</b> ใช่หรือไม่</p>
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleDelete}>ลบ</button>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>ปิด</button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Pets_delete;
