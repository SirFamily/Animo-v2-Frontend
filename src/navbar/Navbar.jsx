import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const guestNav = [
    {
      text: (
        <>
          <div>
            <Link to="/login">
              Login
            </Link>
            <Link to="/register">
              Register
            </Link>
          </div>
        </>
      ),
    },
  ];

  const userNav = [
    {
      text: (
        <>
          
              <ul>
                <li>
                  <Link to="/dashboard/pet">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/setting">Settings</Link>
                </li>
                <li>
                  <button>
                    Logout
                  </button>
                </li>
              </ul>

        </>
      ),
    },
  ];
function Navbar() {
  return (
    <div>
       <nav>
        <div>
          <Link to="/">
            <div>
              <span>A</span>nimo
            </div>
          </Link>
        </div>

        <div>
            <Link to="/login">
              Login
            </Link>
            <Link to="/register">
              Register
            </Link>
          </div>

      </nav>
    </div>
  )
}

export default Navbar
