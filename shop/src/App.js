import React from 'react';
import { BrowserRouter, Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About.js';
import Sigin from './Signin.js';
import logo from './logo.svg';
import './styles/App.css';
import Menu from './Menu.js';
import Footer from './Footer.js';
import Contact from './Contact.js';
import Shop from './Shop.js';
import AdminPage from './AdminPage.js';
import AudioPlayer from './AudioPlayer.js';
import UserProfile from './UserProfile.js';
import { useUser } from './hooks/useUser.js';
import ItemPage from './ItemPage.js';
import UserProfileSettings  from './UserProfileSettings.js';

function App() {
  useUser();

  return (
    <div className="App">
    <AudioPlayer src="./img/Calarepemotoare.mp3" volume={0.5} /> 
    {/* volume set to 50% */}
      <Menu></Menu>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/shop" element={<Shop displayItems='all'/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/userSettings" element={<UserProfileSettings/>}/>
        
        <Route path="/item/:id" element={<ItemPage/>}/>
        <Route path="/admin" element ={<AdminPage/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
