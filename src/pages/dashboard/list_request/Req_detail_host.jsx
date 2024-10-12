import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Css/req_detail_host.module.css";

function Req_detail_host() {
  const { reqId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getRequestDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/request/list/detail/${reqId}`
        );
        setRequest(response.data.data);
        setStatus(response.data.data.bookingStatus);
      } catch (error) {
        console.error("Error fetching request detail:", error);
      }
    };

    getRequestDetail();
  }, [reqId]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/request/update-status/${reqId}`,
        { status: newStatus }
      );
      setLoading(false);
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating booking status:", error);
      setLoading(false);
    }
  };

  if (!request) {
    return <div>กำลังดาวน์โหลด...</div>;
  }

console.log(request)
  const petCount = request.pet_count_bookings?.length || 0;

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        กลับ
      </button>
      <h2 className={styles.title}>รายละเอียดการจอง (Host View)</h2>
      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <label className={styles.label}>ชื่อห้อง:</label>
          <span className={styles.value}>{request.room?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>ประเภทห้อง:</label>
          <span className={styles.value}>{request.room?.type || "-"}</span>
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
              <p className={styles.petBreed}>
                สายพันธุ์: {petBooking.pet.breed}
              </p>
            </div>
          </div>
        ))}
        <div className={styles.infoRow}></div>
        <h3 className={styles.subTitle}>รายละเอียดผู้จอง</h3>
        <div>
          <img
            src={request.user?.url}
            alt={request.user?.firstName}
            className={styles.userImage}
          />
          <div className={styles.userInfo}>
            <p>
              <strong>ชื่อ:</strong> {request.user?.firstName}{" "}
              {request.user?.lastName}
            </p>
            <p>
              <strong>อีเมล:</strong> {request.user?.email}
            </p>
            <p>
              <strong>เบอร์:</strong> {request.user?.phone}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.userDetail} />
      <h3 className={styles.subTitle}>ทั้งหมด</h3>

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
        <label className={styles.label}>เช็คอิน/เช็คเอาท์:</label>
        <span className={styles.value}>
          {request.startDate && request.endDate
            ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(
                request.endDate
              ).toLocaleDateString()}`
            : "-"}
        </span>
      </div>
      <div className={styles.infoRow}>
        <label className={styles.label}>สถานะ:</label>
        <span className={styles.value}>{status || "-"}</span>
      </div>
      <div className={styles.infoRow}>
        <label className={styles.label}>ยอดเงินรวมที่ต้องชำระ:</label>
        <strong className={styles.value}>฿{request.payments[0].amount}</strong>
      </div>

      {/* Status Update Buttons */}
      <div className={styles.buttonGroup}>
        {status !== "reject" && status !== "completed" && (
          <>
            {status !== "confirmed" && (
              <button
                className={styles.confirmButton}
                onClick={() => handleUpdateStatus("confirmed")}
                disabled={loading}
              >
                {loading ? "Updating..." : "Confirm"}
              </button>
            )}
            {status !== "confirmed" && (
              <button
                className={styles.cancelButton}
                onClick={() => handleUpdateStatus("reject")}
                disabled={loading}
              >
                {loading ? "Updating..." : "Reject"}
              </button>
            )}
            {status === "confirmed" && (
              <button
                className={styles.confirmButton}
                onClick={() => handleUpdateStatus("completed")}
                disabled={loading}
              >
                {loading ? "Updating..." : "Complete"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Req_detail_host;
