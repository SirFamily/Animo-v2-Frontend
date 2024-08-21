import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Menu from "../../../menu/Menu";
import csslayer from "../dashboardcss/dashlayer.module.css";
import usercss from "./usercss/user.module.css";

function Profile() {
  const { user, loading } = useAuth();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const toggleEditPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
  };

  const toggleDeletePopup = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Failed to load user data</div>;
  }

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
                {user?.url ? (
                  <img
                    src={user?.url}
                    alt="User Profile"
                    className={usercss.profile_pic}
                  />
                ) : (
                  <img
                    src="https://media.istockphoto.com/id/1298261537/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%A2%E0%B8%B6%E0%B8%94%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2.jpg?s=170667a&w=0&k=20&c=CWEdziJGe7IACY3aVE8NbRuT0tG2UNfffxRJlfWmZaQ="
                    alt="Default Profile"
                    className={usercss.profile_pic}
                  />
                )}
              </div>
              <div className={usercss.Box2}>
              <div className={usercss.editLink} onClick={toggleEditPopup}>
                  Change
                </div>
                <div className={usercss.deleteLink} onClick={toggleDeletePopup}>
                  Delete
                </div>
              </div>
            </div>
            <hr />
            <div className={usercss.Container2}>
              <div className={usercss.Box3}>
                <p>
                  Full Name: {user.firstName} {user.lastName}
                </p>
                <p>Phone: {user.phone}</p>
              </div>
              <div className={usercss.Box4}>
                <p>Email: {user.email}</p>
                <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
              </div>
            </div>
            <hr />
            <div className={usercss.Container2}>
              <div className={usercss.Box3}>
                <p>Address: {user.address}</p>
                <p>District: {user.district}</p>
                <p>Postal Code: {user.postalCode}</p>
              </div>
              <div className={usercss.Box4}>
                <p>Sub District: {user.subDistrict}</p>
                <p>Province: {user.province}</p>
              </div>
            </div>
            <hr />
            <p>Bio: {user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
