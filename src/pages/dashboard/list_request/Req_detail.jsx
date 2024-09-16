import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Css/req_detail.module.css";

function Req_detail() {
  const { reqId } = useParams(); // ดึง reqId จาก URL
  const [request, setRequest] = useState(null);

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลการจองจาก Backend
    const fetchRequestDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/request/list/${reqId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequest(response.data.data); // ตั้งค่าข้อมูลการจองที่ดึงมา
      } catch (error) {
        console.error("Error fetching request detail:", error);
      }
    };

    fetchRequestDetail();
  }, [reqId]);

  if (!request) {
    return <div>Loading...</div>;
  }

  const totalAmount = request.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const petCount = request.pet_count_bookings?.length || 0;

  return (
    <div className={styles.detailContainer}>
      <h2 className={styles.title}>Booking Details</h2>
      <div className={styles.infoBox}>
        {/* ข้อมูลห้องพัก */}
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Name:</label>
          <span className={styles.value}>{request.room?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Type:</label>
          <span className={styles.value}>{request.room?.type || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Price:</label>
          <span className={styles.value}>${request.room?.price || "-"}</span>
        </div>

        {/* ข้อมูลสัตว์เลี้ยง */}
        <div className={styles.infoRow}>
          <label className={styles.label}>Pets:</label>
          <span className={styles.value}>{petCount > 0 ? `${petCount}` : "-"}</span>
        </div>
        {request.pet_count_bookings?.map((petBooking, index) => (
          <div key={index} className={styles.petDetail}>
            <img src={petBooking.pet.url} alt={petBooking.pet.petName} className={styles.petImage} />
            <div className={styles.petInfo}>
              <p className={styles.petName}><strong>{petBooking.pet.petName}</strong></p>
              <p className={styles.petSpecies}>Species: {petBooking.pet.species}</p>
              <p className={styles.petBreed}>Breed: {petBooking.pet.breed}</p>
            </div>
          </div>
        ))}

        {/* ข้อมูลการจอง */}
        <div className={styles.infoRow}>
          <label className={styles.label}>Check-in/Check-out:</label>
          <span className={styles.value}>
            {request.startDate && request.endDate
              ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}`
              : "-"}
          </span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Status:</label>
          <span className={styles.value}>{request.bookingStatus || "-"}</span>
        </div>

        {/* ข้อมูลการชำระเงิน */}
        <div className={styles.infoRow}>
          <label className={styles.label}>Total Amount:</label>
          <span className={styles.value}>${totalAmount.toFixed(2)}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Payment Status:</label>
          <span className={styles.value}>
            {request.payments[0]?.status || "-"}
          </span>
        </div>

        {/* ข้อมูลเจ้าของห้อง */}
        <div className={styles.infoRow}>
          <label className={styles.label}>Host Name:</label>
          <span className={styles.value}>{request.host?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Host Address:</label>
          <span className={styles.value}>{request.host?.address || "-"}</span>
        </div>

        {/* ข้อมูลผู้จอง */}
        <h3 className={styles.subTitle}>User Details</h3>
        <div className={styles.userDetail}>
          <img src={request.user?.url} alt={request.user?.firstName} className={styles.userImage} />
          <div className={styles.userInfo}>
            <p><strong>Name:</strong> {request.user?.firstName} {request.user?.lastName}</p>
            <p><strong>Email:</strong> {request.user?.email}</p>
            <p><strong>Phone:</strong> {request.user?.phone}</p>
            <p><strong>Address:</strong> {request.user?.address}, {request.user?.subDistrict}, {request.user?.district}, {request.user?.province} {request.user?.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Req_detail;
