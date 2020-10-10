import React from 'react';
import HomeScreen from './screens/HomeScreen.js';
import VeerNavbar from "./components/VeerNavbar";
import Generate from "./screens/Generate.js";
import Present from "./screens/Present.js";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {

  return (
    <Router>
    <Route exact path = '/' component = {HomeScreen}></Route>
    <Route exact path = '/generate' component = {Generate}></Route>
    <Route exact path = '/present' component = {Present}></Route>
    </Router>
    
  );
}

export default App;
