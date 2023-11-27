import React, { useState } from 'react';

const Settings = ({ onSavePreferences }) => {
  const [colorPreferences, setColorPreferences] = useState({
    primaryBackground: '#000000',
    primaryTextColor: '#ffffff',
    // Add more color options as needed
  });

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColorPreferences((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSavePreferences = () => {
    onSavePreferences(colorPreferences);
  };

  return (
    <div>
      <h2 className="settingsTitle">Settings</h2>

      <div className="colorChoiceDiv">
        <label htmlFor="primaryBackground">Primary Background:</label>
        <input
          type="color"
          id="primaryBackground"
          name="primaryBackground"
          value={colorPreferences.primaryBackground}
          onChange={handleColorChange}
        />
      </div>

      <div className="colorChoiceDiv">
        <label htmlFor="primaryTextColor">Primary Text Color:</label>
        <input
          type="color"
          id="primaryTextColor"
          name="primaryTextColor"
          value={colorPreferences.primaryTextColor}
          onChange={handleColorChange}
        />
      </div>

      {/* Add more color options as needed */}
      <div className="centerBtnDiv">
        <button className="btn-spotify" onClick={handleSavePreferences}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;