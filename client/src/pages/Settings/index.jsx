import React, { useState } from 'react';

const Settings = () => {

  const [language, setLanguage] = useState('en');
 
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </label>
    </div>
  );
}

export default Settings;
