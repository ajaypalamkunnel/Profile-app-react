import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Sigin from "./pages/Signin";
import Signup from "./pages/Sigup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LoginAdmin from "./Admin/Pages/LoginAdmin";
import HomeAdmin from "./Admin/Pages/HomeAdmin";

const App = () => {
  return (
    <BrowserRouter>
    
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<PublicRoute/>}>
        <Route path="/sign-in" element={<Sigin/>}/>
        <Route path="/Sign-up" element={<Signup/>}/>
        </Route>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        </Route>

        {/* Admin routes */}





     </Routes>
    </BrowserRouter>
  );
};

export default App;
