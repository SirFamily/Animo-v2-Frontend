import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import navcss from "./navcss/nav.module.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const hdlLogout = () => {
      logout();
      navigate("/");
    };
  const guestNav = [
    {
      text: (
        <>
          <div className={navcss.container_nav_gap}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      ),
    },
  ];
  
  const userNav = [
    {
      text: (
        <div className={navcss.container_nav_gap}>
          <div>
            <Link to="dashboard/pets">123</Link>
          </div>
        <div>{user?.email}</div>
  
              <button onClick={hdlLogout} >Logout</button>
    
        </div>
      ),
    },
  ];

  return (
    <div className={navcss.container}>
      <nav className={navcss.container_nav}>
        <div>
          <Link to="/">
            <div>
              <span>A</span>nimo
            </div>
          </Link>
        </div>

        <div>
          {user?.id ? (
            <>
              {userNav.map((item, index) => (
                <div key={index}>{item.text}</div>
              ))}
            </>
          ) : (
            guestNav.map((item, index) => <div key={index}>{item.text}</div>)
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
