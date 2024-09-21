import React, { useState } from 'react';
import styles from './Css/petlist.module.css';
import Pets_edit from './Pets_edit';
import Pets_delete from './Pets_delete';
import Modelpopup from '../../../component/Modelpopup';
function Pets_list({ petData,setPetData }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isReadPopupOpen, setReadPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const toggleEditPopup = (pet) => {
    setSelectedPet(pet);
    setPopupOpen(!isPopupOpen);
  };

  const toggleDeletePopup = (pet) => {
    setSelectedPet(pet);
    setDeletePopupOpen(!isDeletePopupOpen);
  };

  const toggleReadPopup = (pet) => {
    setSelectedPet(pet);
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>สัตว์เลี้ยงของคุณ</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>รูปถ่าย</th>
            <th>ชื่อสัตว์เลี้ยง</th>
            <th>ประเภท</th>
            <th>สายพันธุ์</th>
            <th>เพศ</th>
            <th>วันเกิด</th>
            <th>น้ำหนัก</th>
            <th>ส่วนสูง</th>
            <th>อื่นๆ</th>
            <th>ตั้งค่า</th>
          </tr>
        </thead>
        <tbody>
          {petData.map((pet) => (
            <tr key={pet.id}>
              <td>
                <img
                  src={pet.url}
                  alt={pet.petName}
                  className={styles.petImage}
                />
              </td>
              <td>{pet.petName}</td>
              <td>{pet.species ? pet.species : "-"}</td>
              <td>{pet.breed ? pet.breed : "-"}</td>
              <td>{pet.gender ? pet.gender : "-"}</td>
              <td>
                {pet.birthday
                  ? new Date(pet.birthday).toLocaleDateString()
                  : "-"}
              </td>
              <td>{pet.weight ? `${pet.weight} kg` : '-'}</td>
              <td>{pet.height ? `${pet.height} cm` : '-'}</td>
              <td className={styles.actionLinks}>
                <div className={styles.readLink}>อ่าน</div>
              </td>
              <td className={styles.actionLinks}>
                <div
                  className={styles.editLink}
                  onClick={() => toggleEditPopup(pet)}
                >
                  แก้ไข
                </div>
                <div
                  className={styles.deleteLink}
                  onClick={() => toggleDeletePopup(pet)}
                >
                  ลบ
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && <Pets_edit onClose={toggleEditPopup} pet={selectedPet} setPetData={setPetData} />}
      {isDeletePopupOpen && (
        <Pets_delete
          onClose={toggleDeletePopup}
          setPetData={setPetData}
          pet={selectedPet}
        />
      )}
    </div>
  );
}

export default Pets_list;
