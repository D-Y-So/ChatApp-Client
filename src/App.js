import React, { useState } from 'react';
import './App.css';
import {Login} from "./appFlow/Login";
import Register from "./appFlow/Register";
import PrintAllUsers from './appFlow/printAllUsers';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './dataComponents/Profile';
import MainPage from './appFlow/MainPage';



function App() {
  // const [currentForm, setCurrentForm] = useState('login')

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName)
  // }

  return (

    // <div className='App'>
    //   <MainPage />
    // </div>
  
    <div className='App'>
    <Router>
      <Routes>
        <Route exact path="/printAllUsers" element={<PrintAllUsers />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path='/mainPage' element={<MainPage/>} />
      </Routes>
    </Router>
    </div>

  );      
    // <div className="App">
    //   {
    //      currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>

    //   }
    
    // </div>
  // );
}

export default App;
