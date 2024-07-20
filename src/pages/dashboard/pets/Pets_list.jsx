import React from "react";


function Pets_list({petData}) {
  

  return (
    <div>
      <h1>Pet List</h1>
      <table>
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>History</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {petData.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.petName}</td>
              <td>{pet.animalType}</td>
              <td>{pet.breed}</td>
              <td>{pet.weight}</td>
              <td>{pet.height}</td>
              <td>{pet.gender}</td>
              <td>{pet.birthday ? new Date(pet.birthday).toLocaleDateString() : ""}</td>
              <td>{pet.petHistory}</td>
              <td>
                <img src={pet.url} alt={pet.petName} style={{ width: "100px", height: "100px" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pets_list;
