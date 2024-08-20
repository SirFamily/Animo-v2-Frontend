import React from "react";
import styles from "./Css/petlist.module.css";

function Host_list() {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Housing type</th>
            <th>Accommodation</th>
            <th>Location</th>
            <th>Number of rooms</th>
            <th>Create date</th>
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
            <td>Sample Location</td>
            <td>Sample Number of Rooms</td>
            <td>Sample Create Date</td>
            <td>
              <button>Settings</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Host_list;
