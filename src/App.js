import React, { useState } from 'react';
import './App.css';
import {Login} from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './Profile';
import MainPage from './MainPage';



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
