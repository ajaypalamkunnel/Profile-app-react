import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Sigin from "./pages/sigin";
import Signup from "./pages/SignUp";
import Profile from "./pages/profile";

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<Sigin/>}/>
        <Route path="/Sigun-up" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
     </Routes>
    </BrowserRouter>
  );
};

export default App;
