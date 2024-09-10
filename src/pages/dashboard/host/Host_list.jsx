import React, { useEffect, useState } from "react";
import styles from "./Css/hostlist.module.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Host_delete from "./Host_delete";
import Host_edit from "./Host_edit";

function Host_list({ onUpdate, onHostSelect,handleHostUpdate }) {
  const [hosts, setHosts] = useState([]);
  const { user } = useAuth();
  const uid = user.id;
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const token = localStorage.getItem("token");

    const fetchHosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/host/list/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const hostsData = response.data.data;
        setHosts(hostsData); // Update hosts
        onUpdate(hostsData); // Notify parent component of the update
      } catch (error) {
        console.error("Error fetching hosts:", error);
      }
    };


  useEffect(() => {
    fetchHosts();
  }, [uid]);

  const toggleDeletePopup = (id) => {
    setSelectedHost(id);
    setDeletePopupOpen(!isDeletePopupOpen);
  };

  const toggleEditPopup = (pet) => {
    setSelectedHost(pet);
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Host</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Housing type</th>
            <th>Description</th>
            <th>Location</th>
            <th>Create date</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(hosts) && hosts.length > 0 ? (
            hosts.map((host, index) => (
              <tr key={index} onClick={() => onHostSelect(host.id)}>
                <td>
                  {host.photosHost && host.photosHost.length > 0 ? (
                    <img src={host.photosHost[0].url} alt={host.name} />
                  ) : (
                    <img src="default_image_path" alt={host.name} />
                  )}
                </td>
                <td>{host.name}</td>
                <td>{host.type}</td>
                <td>{host.description}</td>
                <td>{host.address}</td>
                <td>{new Date(host.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={styles.editLink} onClick={() => toggleEditPopup(hosts)}>Edit</div>
                  <div className={styles.deleteLink} onClick={() => toggleDeletePopup(host.id)}>Delete</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hosts available</td>
            </tr>
          )}
        </tbody>
      </table>
      {isPopupOpen && <Host_edit onClose={toggleEditPopup} host={selectedHost[0]} handleHostUpdate={fetchHosts} />}
      {isDeletePopupOpen && (
        <Host_delete onClose={toggleDeletePopup} selectedHost={selectedHost} handleHostUpdate={handleHostUpdate} handleHostUpdateData={fetchHosts}/>
      )}
    </div>
  );
}

export default Host_list;
