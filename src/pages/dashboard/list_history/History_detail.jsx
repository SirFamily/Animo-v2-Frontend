import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Css/history_detail.module.css";
import useAuth from "../../../hooks/useAuth";

function History_detail() {
  const { reqId } = useParams();
  const { user } = useAuth();
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistoryDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/history/detail/history/${reqId}`
        );
        setHistory(response.data.data);
      } catch (error) {
        console.error("Error history detail:", error);
      }
    };

    getHistoryDetail();
  }, [reqId]);

  if (!history) {
    return <div>กำลังดาวน์โหลด...</div>;
  }

  console.log(user.id === history.userId);

  const petCount = history.pet_count_bookings?.length || 0;

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <h2 className={styles.title}>รายละเอียดประวัติการจอง</h2>
      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <label className={styles.label}>ชื่อสถานที่พัก:</label>
          <span className={styles.value}>{history.host?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ที่อยู่สถานที่พัก:</label>
          <span className={styles.value}>{history.host?.address || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ชื่อห้อง:</label>
          <span className={styles.value}>{history.room?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ประเภทห้อง:</label>
          <span className={styles.value}>{history.room?.type || "-"}</span>
        </div>

        <div className={styles.infoRow}>
          <label className={styles.label}>สัตว์เลี้ยง:</label>
          <span className={styles.value}>{petCount > 0 ? petCount : "-"}</span>
        </div>
        {history.pet_count_bookings?.map((petBooking, index) => (
          <div key={index} className={styles.petDetail}>
            <img
              src={petBooking.pet.url}
              alt={petBooking.pet.petName}
              className={styles.petImage}
            />
            <div className={styles.petInfo}>
              <p className={styles.petName}>
                <strong>{petBooking.pet.petName}</strong>
              </p>
              <p className={styles.petSpecies}>
                ประเภท: {petBooking.pet.species}
              </p>
              <p className={styles.petBreed}>สายพันธุ์: {petBooking.pet.breed}</p>
            </div>
          </div>
        ))}
        <div className={styles.userDetail} />
        <h3 className={styles.subTitle}>ทั้งหมด</h3>
        <div className={styles.infoRow}>
          <label className={styles.label}>ราคาห้องพัก:</label>
          <span className={styles.value}>฿{history.room?.price || "-"}</span>
        </div>
        {history.bookingFeatures?.map((feature, index) => (
          <div key={index} className={styles.infoRow}>
            <span className={styles.label}>
              บริการเสริม: <span>{feature.feature.name}</span>
            </span>
            <span className={styles.value}>
              {" "}
              ฿ {feature.feature.price.toFixed(2)}
            </span>
          </div>
        ))}
        <div className={styles.infoRow}>
          <label className={styles.label}>เช็คอิน/เช็คเอาท์:</label>
          <span className={styles.value}>
            {history.startDate && history.endDate
              ? `${new Date(
                  history.startDate
                ).toLocaleDateString()} - ${new Date(
                  history.endDate
                ).toLocaleDateString()}`
              : "-"}
          </span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>สถานะ:</label>
          <span className={styles.value}>{history.bookingStatus || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>จำนวนเงินรวม:</label>
          <span className={styles.value}>฿{history.payments[0].amount}</span>
        </div>

        {user.id === history.userId && (
          <>
            <h3 className={styles.subTitle}>รายละเอียดเจ้าของโฮสต์</h3>
            <div className={styles.userDetail}>
              <img
                src={history.host?.user?.url}
                alt={history.host?.user?.firstName}
                className={styles.userImage}
              />
              <div className={styles.userInfo}>
                <p>
                  <strong>ชื่อ:</strong> {history.host?.user?.firstName}{" "}
                  {history.host?.user?.lastName}
                </p>
                <p>
                  <strong>อีเมล:</strong> {history.host?.user?.email}
                </p>
                <p>
                  <strong>เบอร์:</strong> {history.host?.user?.phone}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default History_detail;
