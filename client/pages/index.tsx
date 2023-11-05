import React, {useState, useEffect} from 'react'
import NavBar from '@/comp/NavBar'

const HomePage = () => {
  return (
    <div className="homepage-container">
      <NavBar></NavBar>
      <div className="content">
        <h1 className="title">Medic.ai</h1>

        <a href="/form" className="btn">Start Form</a>
        <div className="box">
          <p className="description">Welcome to Medic.AI, the cutting-edge healthcare platform revolutionizing the way doctors access and interpret medical data. Medic.AI harnesses the power of artificial intelligence to provide healthcare professionals with the tools they need to make better-informed medical decisions, leading to improved patient care and outcomes.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;