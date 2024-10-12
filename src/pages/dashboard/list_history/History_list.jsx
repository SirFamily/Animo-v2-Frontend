import React, { useEffect, useState } from "react";
import styles from "./Css/history_list.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function History_list() {
  const {user} = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/history/list/history/${user.id}`
        );
        const combinedHistory = [
          ...response.data.datarent?.map(item => ({ ...item, type: "เช่า" })) || [],
          ...response.data.dataowner?.map(item => ({ ...item, type: "ให้เช่า" })) || [],
        ];
        setHistory(combinedHistory);
      } catch (error) {
        console.error("Error booking history:", error);
      }
    };

    getHistory();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>ประวัติการจอง</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ประเภท</th>
            <th>ชื่อห้อง</th>
            <th>จำนวนสัตว์เลี้ยง</th>
            <th>เช็คอิน/เช็คเอาท์</th>
            <th>สถานะ</th>
            <th>ยอดรวม</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((booking, index) => {
              const petCount = booking.pet_count_bookings?.length || 0;
              const totalAmount =
                booking.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

              return (
                <tr key={index}>
                  <td>{booking.type}</td>
                  <td>{booking.room?.name || "-"}</td>
                  <td>{petCount > 0 ? `${petCount}` : "-"}</td>
                  <td>
                    {booking.startDate && booking.endDate
                      ? `${new Date(booking.startDate).toLocaleDateString()} - ${new Date(
                          booking.endDate
                        ).toLocaleDateString()}`
                      : "-"}
                  </td>
                  <td>{booking.bookingStatus || "-"}</td>
                  <td>{totalAmount > 0 ? `฿${totalAmount.toFixed(2)}` : "-"}</td>
                  <td>
                    {/* Check if booking.id exists before using it in the Link */}
                    {booking.id ? (
                      <Link to={`detail/${booking.id}`}>
                        <button className={styles.actionButton}>ดู</button>
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">ไม่พบประวัติการจอง</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default History_list;
