import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

function VerifyHostList() {
  const [verifications, setVerifications] = useState([]);
  const { admin, logoutAdmin } = useAuth();

  const fetchVerifications = async () => {
    try {
      const token = sessionStorage.getItem("token_admin");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/verify/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVerifications(response.data.data);
    } catch (error) {
      console.error("Error fetching verifications:", error);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const hdlLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <div>
      <button onClick={hdlLogout}>Logout</button>

      <h2>Verification List</h2>
      {verifications.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Verify Status</th>
              <th>Admin ID</th>
              <th>Host ID</th>
              <th>Created At</th>
              <th>Verified At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((verification) => (
              <tr key={verification.id}>
                <td>{verification.id}</td>
                <td>{verification.verifyStatus}</td>
                <td>{verification.adminId || "Not assigned"}</td>
                <td>{verification.hostId}</td>
                <td>{new Date(verification.createdAt).toLocaleString()}</td>
                <td>
                  {verification.verifiedAt
                    ? new Date(verification.verifiedAt).toLocaleString()
                    : "Not verified"}
                </td>
                <td>
                  <Link to={`/verify/detail/${verification.id}`}>
                    <button>detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No verifications pending</p>
      )}
    </div>
  );
}

export default VerifyHostList;
