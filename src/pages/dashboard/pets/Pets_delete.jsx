import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../component/Modelpopup';
import styles from './Css/petdelete.module.css';

function Pets_delete({ pet, onClose, setPetData }) {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust as per your token storage logic
      await axios.delete(`http://localhost:8112/pets/delete/${pet.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setPetData(); // Call the onDelete callback to remove the pet from the list
      onClose(); // Close the popup
    } catch (err) {
      setError('Failed to delete the pet. Please try again.');
    }
  };

  return (
    <Modelpopup>
      <div className={styles.popup}>
        <h2 className={styles.header}>คำเตือน</h2>
        <p className={styles.message}>คุณต้องการลบน้อง <b>{pet.petName}</b> ใช่หรือไม่</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleDelete}>ลบ</button>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>ปิด</button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Pets_delete;
