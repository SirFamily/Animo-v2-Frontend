import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Css/requests_detail.module.css";

function Req_detail() {
  const { reqId } = useParams();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRequestDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/request/list/detail/${reqId}`
        );
        setRequest(response.data.data);
      } catch (error) {
        console.error("Error fetching request detail:", error);
      }
    };

    getRequestDetail();
  }, [reqId]);

  if (!request) {
    return <div>กำลังดาวน์โหลด...</div>;
  }

  const totalAmount =
    request.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const petCount = request.pet_count_bookings?.length || 0;

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        กลับ
      </button>
      <h2 className={styles.title}>รายละเอียดการจอง</h2>
      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <label className={styles.label}>ชื่อสถานที่พัก:</label>
          <span className={styles.value}>{request.host?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ที่อยู่สถานที่พัก:</label>
          <span className={styles.value}>{request.host?.address || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ชื่อห้อง:</label>
          <span className={styles.value}>{request.room?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ประเภทห้อง:</label>
          <span className={styles.value}>{request.room?.type || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ราคาห้องพัก:</label>
          <span className={styles.value}>฿{request.room?.price || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>สัตว์เลี้ยง:</label>
          <span className={styles.value}>
            {petCount > 0 ? `${petCount}` : "-"}
          </span>
        </div>
        {request.pet_count_bookings?.map((petBooking, index) => (
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
          <label className={styles.label}>เช็คอิน/เช็คเอาท์:</label>
          <span className={styles.value}>
            {request.startDate && request.endDate
              ? `${new Date(
                  request.startDate
                ).toLocaleDateString()} - ${new Date(
                  request.endDate
                ).toLocaleDateString()}`
              : "-"}
          </span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ราคาห้องพัก:</label>
          <span className={styles.value}>฿{request.room?.price || "-"}</span>
        </div>
        {request.bookingFeatures?.map((feature, index) => (
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
          <label className={styles.label}>สถานะ:</label>
          <span className={styles.value}>{request.bookingStatus || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>จำนวนเงินรวม:</label>
          <span className={styles.value}>฿{totalAmount.toFixed(2)}</span>
        </div>

        <h3 className={styles.subTitle}>รายละเอียดเจ้าของโฮสต์</h3>
        <div className={styles.userDetail}>
          <img
            src={request.host?.user?.url}
            alt={request.host?.user?.firstName}
            className={styles.userImage}
          />
          <div className={styles.userInfo}>
            <p>
              <strong>ชื่อ:</strong> {request.host?.user?.firstName}{" "}
              {request.host?.user?.lastName}
            </p>
            <p>
              <strong>อีเมล:</strong> {request.host?.user?.email}
            </p>
            <p>
              <strong>เบอร์:</strong> {request.host?.user?.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Req_detail;
