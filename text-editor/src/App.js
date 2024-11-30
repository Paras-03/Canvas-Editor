import React, { useState, useRef } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BasicDesign from "./BasicDesign";
import BetterDesign from "./BetterDesign";
import HomePage from "./HomePage"

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={< HomePage/>}/>
          <Route path="/better" element={< BetterDesign/>}/>
          <Route path="/basic" element={< BasicDesign/>}/>
        </Routes>
      </div>
    </Router>
  )
}