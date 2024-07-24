import React, { useState } from 'react';
import styles from './Css/petlist.module.css';
import Pets_edit from './Pets_edit';
import Pets_delete from './Pets_delete';

function Pets_list({ petData }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
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

  const handleDelete = (id) => {
    const updatedPetData = petData.filter(pet => pet.id !== id);
    // Update the petData state here if necessary or pass a callback to the parent component to update it
  };

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>Pets</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Weight</th>
            <th>Height</th>
            <th>More</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {petData.map((pet) => (
            <tr key={pet.id}>
              <td>
                <img src={pet.url} alt={pet.petName} className={styles.petImage} />
              </td>
              <td>{pet.petName}</td>
              <td>{pet.breed}</td>
              <td>{pet.gender}</td>
              <td>{pet.birthday ? new Date(pet.birthday).toLocaleDateString() : ''}</td>
              <td>{pet.weight}</td>
              <td>{pet.height}</td>
              <td className={styles.actionLinks}>
                <div className={styles.readLink}>Read</div>
              </td>
              <td className={styles.actionLinks}>
                <div className={styles.editLink} onClick={() => toggleEditPopup(pet)}>Edit</div>
                <div className={styles.deleteLink} onClick={() => toggleDeletePopup(pet)}>Delete</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && <Pets_edit onClose={toggleEditPopup} pet={selectedPet} />}
      {isDeletePopupOpen && <Pets_delete onClose={toggleDeletePopup} onDelete={handleDelete} pet={selectedPet} />}
    </div>
  );
}

export default Pets_list;