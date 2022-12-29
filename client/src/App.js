import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"; 
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Register/>} /> 
        <Route path="/login" exact element={user ? <Navigate replace to = "/" /> : <Login />} />
        <Route path="/register" exact element={user ? <Navigate replace to = "/" /> : <Register />} />
        <Route path="/profile/:username" exact element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
