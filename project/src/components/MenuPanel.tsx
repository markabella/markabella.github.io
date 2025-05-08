import React, { useState } from 'react';
import { Menu, Volume2, VolumeX } from 'lucide-react';
import { toggleDisplay, toggleValueOnOff } from '../utils/uiUtils';

const MenuPanel: React.FC = () => {
  const [audioState, setAudioState] = useState('on');

  // Toggle menu visibility
  const handleToggleMenu = () => {
    toggleDisplay('#play-menu');
  };

  // Toggle audio state
  const handleToggleAudio = () => {
    const newState = toggleValueOnOff('#menu-mute');
    setAudioState(newState);
  };

  // Toggle splash screen
  const handleToggleSplash = () => {
    toggleDisplay('.login-page');
  };

  return (
    <>
      {/* Menu toggle button */}
      <button className="ui-button" onClick={handleToggleMenu}>
        <Menu size={18} />
      </button>
      
      {/* Menu panel */}
      <div id="play-menu">
        <div className="menu-buttons">
          <button id="menu-mute" value={audioState} onClick={handleToggleAudio}>
            {audioState === 'on' ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span> Sound: </span>
            <span id="audio-state">{audioState}</span>
          </button>
          <button onClick={handleToggleSplash}>Toggle Splash</button>
        </div>
      </div>
    </>
  );
};

export default MenuPanel;