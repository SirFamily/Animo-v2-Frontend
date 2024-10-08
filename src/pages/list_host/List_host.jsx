import React, { useEffect, useState } from "react";
import styles from "./Css/list_host.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import housing_types from "../../component/data/hostingtype.json";
import api_province from "../../component/data/api_province.json";
import pet_data from "../../component/data/petdata.json";
import useAuth from "../../hooks/useAuth";

function ListHost() {
  const { user } = useAuth();
  const [hosts, setHosts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [typedSearchName, setTypedSearchName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [petQuantity, setPetQuantity] = useState(1);

  useEffect(() => {
    const getHosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pre/host/list/${user.id}`
        );
        setHosts(response.data.data);
        console.log(hosts);
      } catch (error) {
        console.error("Error host data:", error);
      }
    };

    getHosts();
  }, []);

  const filteredHosts = hosts.filter((host) => {
    const matchesName = host.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesType = selectedType === "" || host.type === selectedType;
    const matchesProvince =
      selectedProvince === "" || host.address.includes(selectedProvince);

    const matchesPetAndQuantity = host.rooms.some((room) => {
      const supportsSelectedPet =
        selectedPet === "" ||
        (room.supportPets &&
          room.supportPets.some((pet) => pet.name === selectedPet));
      const supportsPetQuantity = room.quantity >= petQuantity;
      return supportsSelectedPet && supportsPetQuantity;
    });

    return (
      matchesName && matchesType && matchesProvince && matchesPetAndQuantity
    );
  });

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setTypedSearchName(value);
    setSearchName(value); // อัพเดตค่าการค้นหาแบบทันที
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <div className={styles.filterSection01}>
          <div className={styles.searchBar}>
            <p>ค้นหาชื่อที่พัก:</p>
            <input
              type="text"
              value={typedSearchName}
              onChange={handleSearchInput}
            />
          </div>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">เลือกจังหวัด</option>
            {api_province.map((province) => (
              <option key={province.id} value={province.name_th}>
                {province.name_th}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterSection01}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">เลือกประเภทของที่พัก</option>
            {housing_types.housing_types.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
          <select
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
          >
            <option value="">เลือกประเภทสัตว์เลี้ยง</option>
            {pet_data.species.map((pet) => (
              <option key={pet.id} value={pet.name}>
                {pet.name}
              </option>
            ))}
          </select>
          <div className={styles.searchBar}>
            <p>จำนวนสัตว์เลี้ยง:</p>
            <input
              type="number"
              placeholder="จำนวนสัตว์เลี้ยง"
              className={styles.searchInput}
              value={petQuantity}
              onChange={(e) => setPetQuantity(parseInt(e.target.value, 10))}
              min="1"
            />
          </div>
        </div>
      </div>
      <div className={styles.BackgroundCardGrid}>
        <div className={styles.cardGrid}>
          {filteredHosts.length === 0 ? (
            <p>ไม่มีข้อมูลที่พัก</p>
          ) : (
            filteredHosts.map((host) => (
              <Link
                key={host.id}
                to={`/host/${host.id}`}
                style={{ textDecoration: "none" }}
              >
                <div key={host.id} className={styles.card}>
                  <img
                    src={
                      host.photosHost[0]?.url ||
                      "https://via.placeholder.com/200"
                    }
                    alt={host.name}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardTitle}>{host.name}</div>

                  <div className={styles.cardLocation}>
                    <span>📍 {host.address.split(", ")[1]}</span>
                    <span>🏠 {host.type}</span>
                  </div>
                  <div className={styles.cardPrice}>
                    {host.rooms.length > 0
                      ? `💵 ${Math.min(
                          ...host.rooms.map((room) => room.price)
                        )}–${Math.max(
                          ...host.rooms.map((room) => room.price)
                        )} ฿`
                      : "N/A"}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ListHost;
