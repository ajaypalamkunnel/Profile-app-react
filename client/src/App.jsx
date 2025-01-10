import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Sigin from "./pages/Signin";
import Signup from "./pages/Sigup";
import Profile from "./pages/profile";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<Sigin/>}/>
        <Route path="/Sign-up" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
     </Routes>
    </BrowserRouter>
  );
};

export default App;
