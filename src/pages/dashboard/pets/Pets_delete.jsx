import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../component/Modelpopup';

function Pets_delete({ pet, onClose, onDelete }) {
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
      onDelete(pet.id); // Call the onDelete callback to remove the pet from the list
      onClose(); // Close the popup
    } catch (err) {
      setError('Failed to delete the pet. Please try again.');
    }
  };

  return (
    <Modelpopup>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete {pet.petName}?</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={onClose}>Cancel</button>
    </Modelpopup>
  );
}

export default Pets_delete;
