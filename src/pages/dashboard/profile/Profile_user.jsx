import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Menu from "../../../menu/Menu";
import csslayer from "../dashboardcss/dashlayer.module.css";
import usercss from "./usercss/user.module.css";
import axios from "axios";

function ProfileUser() {
  const { user, loading, run } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthday: "",
    address: "",
    district: "",
    postalCode: "",
    subDistrict: "",
    province: "",
    bio: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ดึงข้อมูลผู้ใช้มาแสดงใน input fields เมื่อโหลดหน้าเสร็จ
  useEffect(() => {
    if (user) {
      setUpdatedUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        birthday: user.birthday || "",
        address: user.address || "",
        district: user.district || "",
        postalCode: user.postalCode || "",
        subDistrict: user.subDistrict || "",
        province: user.province || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  // เปิด/ปิดโหมดแก้ไข
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // handle การเปลี่ยนค่า input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // handle การเปลี่ยนรูปภาพ
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ส่งข้อมูลไปยัง backend เมื่อกด Save
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", updatedUser.firstName);
      formData.append("lastName", updatedUser.lastName);
      formData.append("phone", updatedUser.phone);
      formData.append("email", updatedUser.email);
      formData.append("birthday", updatedUser.birthday);
      formData.append("address", updatedUser.address);
      formData.append("district", updatedUser.district);
      formData.append("postalCode", updatedUser.postalCode);
      formData.append("subDistrict", updatedUser.subDistrict);
      formData.append("province", updatedUser.province);
      formData.append("bio", updatedUser.bio);

      if (selectedImage) {
        formData.append("img", selectedImage);
      }

      const token = localStorage.getItem("token");

      await axios.put(`${import.meta.env.VITE_API_URL}/auth/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditMode(false);
      run();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Failed to load user data</div>;

  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer}>
        <div className={csslayer.container_layer_buttom}>
          <div className={usercss.Container0}>
            <h1>Profile</h1>
            <hr />
            <div className={usercss.Container1}>
              <div className={usercss.Box1}>
                <p>Photo</p>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className={usercss.profile_pic}
                  />
                ) : (
                  <img
                    src={
                      user.url ||
                      "https://media.istockphoto.com/id/1298261537/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%A2%E0%B8%B6%E0%B8%94%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2.jpg"
                    }
                    alt="User Profile"
                    className={usercss.profile_pic}
                  />
                )}
                {isEditMode && (
                  <input type="file" onChange={handleImageChange} />
                )}
              </div>
            </div>
            <hr />
            <div className={usercss.Container2}>
              <div className={usercss.Box3}>
                <label>Full Name:</label>
                {isEditMode ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={updatedUser.firstName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={updatedUser.lastName}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                )}
                <label>Phone:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={updatedUser.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>
              <div className={usercss.Box4}>
                <label>Email:</label>
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.email}</p>
                )}
                <label>Birthday:</label>
                {isEditMode ? (
                  <input
                    type="date"
                    name="birthday"
                    value={user.birthday}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{new Date(user.birthday).toLocaleDateString()}</p>
                )}
              </div>
            </div>
            <hr />
            <div className={usercss.Container2}>
              <div className={usercss.Box3}>
                <label>Address:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="address"
                    value={updatedUser.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.address}</p>
                )}
                <label>District:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="district"
                    value={updatedUser.district}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.district}</p>
                )}
                <label>Postal Code:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={updatedUser.postalCode}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.postalCode}</p>
                )}
              </div>
              <div className={usercss.Box4}>
                <label>Sub District:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="subDistrict"
                    value={updatedUser.subDistrict}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.subDistrict}</p>
                )}
                <label>Province:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="province"
                    value={updatedUser.province}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.province}</p>
                )}
              </div>
            </div>
            <hr />
            <label>Bio:</label>
            {isEditMode ? (
              <textarea
                name="bio"
                value={updatedUser.bio}
                onChange={handleInputChange}
              />
            ) : (
              <p>{user.bio}</p>
            )}
            <div className={usercss.Box2}>
              <div className={usercss.editLink} onClick={toggleEditMode}>
                {isEditMode ? "Cancel" : "Edit"}
              </div>
              {isEditMode && (
                <button className={usercss.editLink} onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
