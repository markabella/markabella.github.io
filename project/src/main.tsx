import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a container for our React app that will be placed over the C2 canvas
const createUIContainer = () => {
  const container = document.createElement('div');
  container.id = 'ui-container';
  document.body.appendChild(container);
  return container;
};

// Initialize the app
const initializeApp = () => {
  const container = createUIContainer();
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Give time for the Construct 2 canvas to initialize
  setTimeout(initializeApp, 500);
});