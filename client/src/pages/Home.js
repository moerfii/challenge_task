import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

return(
  <>
  <div className="container">
     <Link to="/album" className="link">Browse Marketplace</Link>
      Pear-to-Pear App
  </div>
  </>
)
}

export default Home;
