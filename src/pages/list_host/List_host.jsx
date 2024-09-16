import React, { useEffect, useState } from 'react';
import styles from './Css/list_host.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import housing_types from "../../component/data/hostingtype.json";
import api_province from "../../component/data/api_province.json"; // Import ข้อมูลจังหวัด
import pet_data from "../../component/data/petdata.json"; // Import ข้อมูลสัตว์เลี้ยง

function ListHost() {
  const [hosts, setHosts] = useState([]);
  const [searchName, setSearchName] = useState(''); // สร้าง state สำหรับเก็บค่าค้นหา
  const [typedSearchName, setTypedSearchName] = useState(''); // เก็บค่าที่ผู้ใช้พิมพ์แบบทันที
  const [searchTimeout, setSearchTimeout] = useState(null); // สร้าง state สำหรับเก็บ timeout ID
  const [selectedType, setSelectedType] = useState(''); // State สำหรับเก็บประเภทที่เลือก
  const [selectedProvince, setSelectedProvince] = useState(''); // State สำหรับเก็บจังหวัดที่เลือก
  const [selectedPet, setSelectedPet] = useState(''); // State สำหรับเก็บสัตว์เลี้ยงที่เลือก
  const [petQuantity, setPetQuantity] = useState(1); // State สำหรับเก็บจำนวนสัตว์เลี้ยงที่ผู้ใช้ระบุ

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pre/host/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHosts(response.data.data); // ตั้งค่า hosts จากการตอบกลับของ API
        console.log(response);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchHosts();
  }, []);

  // ฟังก์ชันสำหรับกรอง hosts โดยดูจากชื่อ ประเภท จังหวัด สัตว์เลี้ยงที่เลือก และจำนวนสัตว์เลี้ยงที่ห้องรองรับ
  const filteredHosts = hosts.filter((host) => {
    const matchesName = host.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesType = selectedType === '' || host.type === selectedType; // กรองเฉพาะประเภทที่ตรงกันหรือทั้งหมดถ้าไม่เลือก
    const matchesProvince = selectedProvince === '' || host.address.includes(selectedProvince); // กรองเฉพาะจังหวัดที่ตรงกันหรือทั้งหมดถ้าไม่เลือก

    // กรองข้อมูลห้องที่รองรับสัตว์เลี้ยงที่เลือกและจำนวนสัตว์เลี้ยงที่สามารถรองรับได้
    const matchesPetAndQuantity = host.rooms.some((room) => {
      const supportsSelectedPet = selectedPet === '' || (room.supportPets && room.supportPets.some((pet) => pet.name === selectedPet));
      const supportsPetQuantity = room.quantity >= petQuantity; // ตรวจสอบว่า room รองรับจำนวนสัตว์เลี้ยงตามที่กำหนดหรือไม่
      return supportsSelectedPet && supportsPetQuantity;
    });

    return matchesName && matchesType && matchesProvince && matchesPetAndQuantity;
  });

  // ฟังก์ชันการจัดการ input เพื่อให้ดีเลย์การค้นหา 5 วินาที
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setTypedSearchName(value); // เก็บค่าที่พิมพ์ทันที

    if (searchTimeout) {
      clearTimeout(searchTimeout); // ล้าง timeout เดิมหากมี
    }

    // ตั้ง timeout ใหม่หลังจากพิมพ์เสร็จ 5 วินาที
    const timeoutId = setTimeout(() => {
      setSearchName(value); // อัพเดตค่าจริงของการค้นหาหลังดีเลย์
    }, 500); // ดีเลย์ 5 วินาที (5000 มิลลิวินาที)

    setSearchTimeout(timeoutId); // เก็บ timeout ID เพื่อสามารถเคลียร์ได้
  };

  return (
    <div className={styles.container}>
      {/* ส่วนของการกรองข้อมูล */}
      <div className={styles.filterSection}>
        {/* Search Bar อยู่ชิดขวา */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="ค้นหาชื่อ Host"
            className={styles.searchInput}
            value={typedSearchName} // ใช้ state สำหรับค่าที่พิมพ์ทันที
            onChange={handleSearchInput} // ใช้ฟังก์ชันใหม่สำหรับการดีเลย์
          />
        </div>

        {/* ส่วนอื่นๆ จัดเรียงเป็นบรรทัดเดียวกัน */}
        <div className={styles.filterTags}>
          <select
            className={styles.filterSelect}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)} // อัพเดต state เมื่อมีการเลือกประเภท
          >
            <option value="">เลือกประเภทของที่พัก</option>
            {housing_types.housing_types.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>

          <select
            className={styles.filterSelect}
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)} // อัพเดต state เมื่อมีการเลือกจังหวัด
          >
            <option value="">เลือกจังหวัด</option>
            {api_province.map((province) => (
              <option key={province.id} value={province.name_th}>
                {province.name_th}
              </option>
            ))}
          </select>

          <select
            className={styles.filterSelect}
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)} // อัพเดต state เมื่อมีการเลือกสัตว์เลี้ยง
          >
            <option value="">เลือกประเภทสัตว์เลี้ยง</option>
            {pet_data.species.map((pet) => (
              <option key={pet.id} value={pet.name}>
                {pet.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="จำนวนสัตว์เลี้ยง"
            className={styles.searchInput}
            value={petQuantity}
            onChange={(e) => setPetQuantity(parseInt(e.target.value, 10))} // อัพเดต state เมื่อมีการป้อนจำนวนสัตว์เลี้ยง
            min="1"
          />
        </div>
      </div>

      {/* กริดของการ์ดแสดง host */}
      <div className={styles.cardGrid}>
        {filteredHosts.length === 0 ? (
          <p>ไม่มีข้อมูล Host</p>
        ) : (
          filteredHosts.map((host) => (
            <Link key={host.id} to={`/host/${host.id}`}>
              <div key={host.id} className={styles.card}>
                <img
                  src={host.photosHost[0]?.url || 'https://via.placeholder.com/200'}
                  alt={host.name}
                  className={styles.cardImage}
                />
                <div className={styles.cardTitle}>{host.name}</div>

                <div className={styles.cardLocation}>
                  <span>📍 {host.address.split(', ')[1]}</span>
                  <span>🏠 {host.type}</span>
                </div>
                <div className={styles.cardPrice}>
                  {host.rooms.length > 0
                    ? `💵 ${host.rooms[0].price}–${Math.max(...host.rooms.map(room => room.price))}$`
                    : 'N/A'}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ListHost;
