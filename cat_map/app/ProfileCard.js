// app/components/ProfileCard.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./ProfileCard.css";

const ProfileCard = ({ catData, onClose }) => {
  const [activeSection, setActiveSection] = useState("#about");

  const isCardActive = activeSection !== "#about";

  const handleButtonClick = (e) => {
    const targetSection = e.currentTarget.getAttribute("data-section");
    if (targetSection && ["#about", "#demand", "#rubplace"].includes(targetSection)) {
      setActiveSection(targetSection);
    }
  };

  const renderSectionContent = (sectionId) => {
    // Customize content based on cat data
    switch (sectionId) {
      case "#about":
        return (
          <>
            <div className="card-subtitle">ABOUT</div>
            <p className="card-desc">
              {catData.bio || "A beloved UTA campus cat with a unique personality!"}
            </p>
            <div className="cat-stats">
              <div className="stat-item">
                <span className="stat-label">Age</span>
                <span className="stat-value">{catData.age} years</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Color</span>
                <span className="stat-value">{catData.color}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Personality</span>
                <span className="stat-value">{catData.personality}</span>
              </div>
            </div>
          </>
        );
      case "#demand":
        return (
          <>
            <div className="card-subtitle">FAVORITE TREATS & NEEDS</div>
            <ul className="card-desc">
              <li>Tuna treats or wet food 🐟</li>
              <li>Fresh water daily 💧</li>
              <li>Gentle petting sessions 🐾</li>
              <li>Warm sunny spots ☀️</li>
              <li>Campus adventures with students 🎓</li>
            </ul>
          </>
        );
      case "#rubplace":
        return (
          <>
            <div className="card-subtitle">BEST PETTING SPOTS</div>
            <div className="card-rubplace-wrapper">
              <div className="card-rubplace">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/1818/1818401.png"
                  alt="Pet spot icon"
                  width={24}
                  height={24}
                  className="rubplace-icon"
                />
                <span>Under the chin - gentle strokes only</span>
              </div>
              <div className="card-rubplace">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/1818/1818401.png"
                  alt="Pet spot icon"
                  width={24}
                  height={24}
                  className="rubplace-icon"
                />
                <span>Behind the ears - soothing massage spot</span>
              </div>
              <div className="card-rubplace">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/1818/1818401.png"
                  alt="Pet spot icon"
                  width={24}
                  height={24}
                  className="rubplace-icon"
                />
                <span>Base of tail - approach carefully!</span>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const sections = [
    { id: "#about", label: "ABOUT" },
    { id: "#demand", label: "TREATS" },
    { id: "#rubplace", label: "PET SPOTS" },
  ];

  return (
    <div className="profile-card-container">
      <div
        className={`card ${isCardActive ? "is-active" : ""}`}
        data-state={activeSection}
      >
        <div className="card-header">
          <div className="card-cover">
            <Image
              src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
              alt={`${catData.name} cover`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          
          <div className="card-avatar-wrapper">
            <Image
              src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
              alt={`${catData.name} avatar`}
              width={120}
              height={120}
              className="card-avatar"
            />
          </div>
          
          <h1 className="card-fullname">{catData.name}</h1>
          <h2 className="card-jobtitle">{catData.personality} Campus Cat</h2>
        </div>

        <div className="card-main">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`card-section ${activeSection === section.id ? "is-active" : ""}`}
              id={section.id.substring(1)}
            >
              <div className="card-content">
                {renderSectionContent(section.id)}
              </div>
            </div>
          ))}

          <div className="card-buttons">
            {sections.map((button) => (
              <button
                key={button.id}
                data-section={button.id}
                className={`tab-button ${activeSection === button.id ? "is-active" : ""}`}
                onClick={handleButtonClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Close button overlay */}
      <button
        onClick={onClose}
        className="close-button"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default ProfileCard;