import React, { useEffect } from 'react';
import $ from 'jquery';
import ChatInterface from './components/ChatInterface';
import GameProgress from './components/GameProgress';
import MenuPanel from './components/MenuPanel';
import { hideConstructUI } from './utils/construct2Utils';
import { placeUI, toggleDisplay } from './utils/uiUtils';

// Import jQuery to window for compatibility with existing code
window.$ = window.jQuery = $;

function App() {
  useEffect(() => {
    // Initialize UI
    const initializeUI = () => {
      // Place UI elements to match canvas size
      placeUI();
      
      // Hide Construct UI elements
      hideConstructUI();
      
      // Hide menu and chat initially
      toggleDisplay('#play-menu');
      toggleDisplay('#chat-window');
      
      // Setup window resize handler
      window.addEventListener('resize', () => {
        setTimeout(placeUI, 50);
      });
    };

    // Initialize with delays to ensure canvas is loaded
    setTimeout(initializeUI, 300); // First try
    setTimeout(placeUI, 1000); // Try again for slow connection
    setTimeout(placeUI, 5000); // Try again for really slow connection

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', () => {
        setTimeout(placeUI, 50);
      });
    };
  }, []);

  return (
    <div id="UI">
      {/* UI Buttons in top right */}
      <div className="ui-buttons">
        <MenuPanel />
        <GameProgress />
        <ChatInterface />
      </div>
      
      {/* Hidden initially, will be controlled by toggles */}
      <div className="login-page" style={{visibility: 'visible'}}>
        <h2>Welcome to the Game</h2>
        <p>Login or start playing!</p>
      </div>
    </div>
  );
}

export default App;