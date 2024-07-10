import React from 'react'
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <div>
        menu
        <div>
          <Link to="/dashboard/">Dashborad</Link>
        </div>
        <div>
          <Link to="/dashboard/pets">Pet</Link>
        </div>
        <div>
          <Link to="/dashboard/host">Host</Link>
        </div>
        <div>
          <Link to="/dashboard/request">Request</Link>
        </div>
        <div>
          <Link to="/dashboard/history">History</Link>
        </div>
        <div>
          <Link to="/dashboard/profile">Profile</Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
