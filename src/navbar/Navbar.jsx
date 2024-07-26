import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import navcss from "./navcss/nav.module.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const guestNav = [
    {
      text: (
        <>
          <div className={navcss.container_nav_user}>
            <div className={navcss.container_nav_userlogin}>
              <Link to="/login">Login</Link>
            </div>
            <div className={navcss.container_nav_userregister}>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </>
      ),
    },
  ];

  const userNav = [
    {
      text: (
        <div className={navcss.container_nav_gap}>
          <div ref={dropdownRef} className={navcss.dropdown}>
            <div
              onClick={handleDropdownToggle}
              className={navcss.dropdown_toggle}
            >
              <div className={navcss.container_nav_ue}>
                <div>{user?.firstName}</div>
                <div className={navcss.email_text}>{user?.email}</div>
                <p></p>
              </div>
              {user?.url ? (
                <img
                  src={user?.url}
                  alt="User Profile"
                  className={navcss.profile_pic}
                />
              ) : (
                <img
                  src="https://media.istockphoto.com/id/1298261537/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%A2%E0%B8%B6%E0%B8%94%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2.jpg?s=170667a&w=0&k=20&c=CWEdziJGe7IACY3aVE8NbRuT0tG2UNfffxRJlfWmZaQ="
                  alt="Default Profile"
                  className={navcss.profile_pic}
                />
              )}
            </div>
            {dropdownOpen && (
              <div className={navcss.dropdown_menu}>
                <Link to="dashboard/">Dashboard</Link>
                <button onClick={hdlLogout}>Logout</button>
              </div>
            )}
          </div>
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
          <div className={navcss.container_nav2}>
            <Link to="">
              <p>Booking</p>
            </Link>
            <Link to="">
              <p>About us</p>
            </Link>
            <Link to="">
              <p>Contact us </p>
            </Link>
          </div>
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
