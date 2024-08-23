import React from 'react'
import styles from "../Css/hostlist.module.css";

function Features_list() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Features</h2>
       <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test01</td>
            <td>ready</td>
            <td>$10</td>
            <td>Edit Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Features_list
