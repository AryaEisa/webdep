import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListVenues from './listVenues';
import ListVenuesDetail from './listVenueDetails';
import "./venueStyle.css";
import Navbar from './header';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListVenues />} />
        <Route path="/venues" element={<ListVenues />} />
        <Route path="/venues/:id" element={<ListVenuesDetail />} />
      </Routes>
    </Router>
  );
}

/*
const App = () =>{
  return <div><Navbar/></div>;
};
*/


export default App;


