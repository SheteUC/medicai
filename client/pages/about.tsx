import React from 'react';
import NavBar from '@/comp/NavBar'


const About = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className = "about-container">
      <h1 className="about-title">Meet Our Team</h1>
      <div className="team-members">
        <div className="member-card">
          <div className="member-name">Eli Fouts</div>
          <div className="member-description">Front-end Developer</div>
        </div>
        <div className="member-card">
          <div className="member-name">Rai Duong</div>
          <div className="member-description">Back-end Developer</div>
        </div>
        <div className="member-card">
          <div className="member-name">Daniel Vennemeyer</div>
          <div className="member-description">Back-end Developer</div>
        </div>
        <div className="member-card">
          <div className="member-name">Atharv Shete</div>
          <div className="member-description">Web Developer</div>
        </div>
      </div>
      <div className="website-aim">
        <h2>Our Aim</h2>
        <div className="box2">
        <p className="description">MedicAI aims to revolutionize medical research and practice by providing doctors with a cutting-edge, fully contextual search tool.This powerful  tool addresses the critical need for personalized medical information, reducing biases and ensuring that healthcare professionals have access to the most relevant and accurate knowledge for making informed decisions. Through its innovative approach, MedicAI strives to advance healthcare equity, enhance patient outcomes, and promote a more inclusive and evidence-based medical landscape. </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;