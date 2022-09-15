import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// TODO: Setup router here

function App() {


  return (
      <div className="container-app">
            <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/sign-up" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
      </div>
  );
}

export default App;
