import { auth } from "@/firebase";
import { createContext } from "@/utils";
import { FC, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

interface AuthContext {
  isAuthenticated: boolean;
  showScreen: boolean;
  signOut(): void;
}

const AuthContext = createContext<AuthContext>();

const cookies = new Cookies();

const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showScreen, setShowScreen] = useState(true);
  const [loading, setLoading] = useState(true);

  function signOut() {
    auth.signOut();
    ["district_id", "user"].forEach((cookie) => cookies.remove(cookie, { path: "/" }));
    window.location.href = "/signin";
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      }
      // setLoading(false);
      // setShowScreen(true);
    });
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, showScreen, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
