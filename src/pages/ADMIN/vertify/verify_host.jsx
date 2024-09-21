import React from 'react'
import useAuth from '../../../hooks/useAuth'

function verify_host() {
    const { admin, logoutAdmin } = useAuth();

    const hdlLogout = () => {
        logoutAdmin();
        navigate("/");
      };
  return (
    <div>
       <button onClick={hdlLogout}>Logout</button>
       <div>{admin.id}</div>
       <div></div>
    </div>
  )
}

export default verify_host
