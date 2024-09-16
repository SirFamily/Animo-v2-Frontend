import React from 'react'
import Menu from "../../../menu/Menu"
import csslayer from "../dashboardcss/dashlayer.module.css";

function history() {
  return (
    <div className={csslayer.container}>
    <Menu />
    <div className={csslayer.container_g_layer}>
      <div className={csslayer.container_layer_buttom_his}>
        <h1>history</h1>
      </div>
    </div>
  </div>
  )
}

export default history


{/* <div className={styles.tableContainer}>
      <h1 className={styles.title}>Request</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking type</th>
            <th>Room</th>
            <th>Pets</th>
            <th>Check-in/out</th>
            <th>Status</th>
            <th>Total amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={index}>
                <td>{request.bookingType ? request.bookingType : '-'}</td>
                <td>{request.room ? request.room : '-'}</td>
                <td>{request.pets ? request.pets : '-'}</td>
                <td>{request.checkInOut ? request.checkInOut : '-'}</td>
                <td>{request.status ? request.status : '-'}</td>
                <td>{request.totalAmount ? request.totalAmount : '-'}</td>
                <td>
                  <button className={styles.actionButton}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No requests available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div> */}