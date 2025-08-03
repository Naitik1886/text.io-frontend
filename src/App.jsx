import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader, Settings } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  const { authUserData, checkAuth, isCheckingAuth , onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()

  

  console.log(onlineUsers)

 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUserData) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className=" size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme} >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            authUserData ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/signup"
          element={!authUserData ? <SignUpPage /> : <Navigate to="/" replace />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/login"
          element={!authUserData ? <LoginPage /> : <Navigate to="/" replace />}
        />  
        <Route
          path="/profile"
          element={
            authUserData ? <ProfilePage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
