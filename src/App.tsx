import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeBanner from './components/HomeBanner';
import Header from './components/Header';
import UseAppContext from './context/AppContext';

function App() {
  // BASIC NOTES
  //tailwind.config.ts  darkMode: "class", ---> this enable user to toggle button for preffered user theme
  //used context API for global statem anagement and js-cookie for storing data in browser.
  // ADD transition-colors duration-300 for adding smooth color transition effect to the parent of components . 
  //CHECK THE CODE . THANK YOU . (will be uploading on youtube channel soon. Thank you.)

  return (
  
  <>
    
    <Header/>
    <HomeBanner/>
    </>
  );
}

export default App;
