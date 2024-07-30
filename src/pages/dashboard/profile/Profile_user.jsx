import React from 'react'
import useAuth from "../../../hooks/useAuth";
import Menu from "../../../menu/Menu"

function profile() {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>Failed to load user data</div>;
    }
  
  return (
    <div>
      <Menu/>
      <div>
      <h1>Dashboard</h1>
      <p>Id , {user.id}</p>
      <p>Welcome, {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
      <p>Address: {user.address}</p>
      <p>Sub District: {user.subDistrict}</p>
      <p>District: {user.district}</p>
      <p>Province: {user.province}</p>
      <p>Postal Code: {user.postalCode}</p>
      <p>Bio: {user.bio}</p>
      {user.url && <img src={user.url} alt="Profile" />}
    </div>
    </div>
  )
}

export default profile