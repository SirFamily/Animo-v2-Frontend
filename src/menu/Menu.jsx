import React from 'react'
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <div>
        menu
        <div>
          <Link to="/dashboard/pets">pet</Link>
        </div>
        <div>
          <Link to="/dashboard/host">host</Link>
        </div>
        <div>
          <Link to="/dashboard/request">request</Link>
        </div>
        <div>
          <Link to="/dashboard/history">history</Link>
        </div>
        <div>
          <Link to="/dashboard/profile">profile</Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
