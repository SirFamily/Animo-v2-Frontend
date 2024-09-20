import axios from "axios";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const run = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      if (!token) {
        let token_admin = sessionStorage.getItem("token_admin");
        if (!token_admin) {
          return;
        }
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/a/getad`,
          {
            headers: { Authorization: `Bearer ${token_admin}` },
          }
        );
        setAdmin(response.data);
      }
      const rs = await axios.get(`${import.meta.env.VITE_API_URL}/auth/getme`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(rs.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    run();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // localStorage.removeItem('status')
  };

  const logoutAdmin = () => {
    setAdmin(null);
    sessionStorage.removeItem("token_admin");
    // localStorage.removeItem('status')
  };

  return (
    <AuthContext.Provider value={{user, setUser, loading, logout , run ,admin, setAdmin , logoutAdmin}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
