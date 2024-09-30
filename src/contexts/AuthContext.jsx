import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          let adminData = JSON.parse(localStorage.getItem("adminData"));
          if (!adminData) {
            return;
          }
          setAdmin(adminData);
        }
        setUser(userData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    run();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("adminData");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        admin,
        setAdmin,
        logoutAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
