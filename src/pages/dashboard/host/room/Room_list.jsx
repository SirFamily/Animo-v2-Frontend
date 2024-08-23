import React from "react";
import styles from "../Css/hostlist.module.css";

function Room_list() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Room</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Amenities</th>
            <th>Price</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="path_to_image" alt="Description" />
            </td>
            <td>Sample Name</td>
            <td>Sample Housing Type</td>
            <td>Sample Accommodation</td>
            <td>
              <button>Settings</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Room_list;
