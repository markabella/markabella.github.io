import React, { useEffect, useState } from 'react';
import { BarChart } from 'lucide-react';
import { get30TextFromRuntime } from '../utils/construct2Utils';
import { toggleDisplay, updateGameProgressBar } from '../utils/uiUtils';

const GameProgress: React.FC = () => {
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  // Toggle steps window visibility
  const handleToggleSteps = () => {
    toggleDisplay('#steps-window');
  };

  // Update the progress display
  const updateProgressDisplay = () => {
    try {
      const text = get30TextFromRuntime();
      setProgressText(text);

      // Extract progress percentage from text (assuming format like "15.0 steps completed")
      const progressMatch = text.match(/\d+\.\d\s/g);
      if (progressMatch && progressMatch.length > 0) {
        const progress = Number(progressMatch[0]) / 30;
        setProgressPercent(progress);
        updateGameProgressBar(progress);
      }
    } catch (err) {
      console.error('Error updating progress display:', err);
    }
  };

  // Update progress periodically
  useEffect(() => {
    const interval = setInterval(updateProgressDisplay, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Steps toggle button */}
      <button className="ui-button" onClick={handleToggleSteps}>
        <BarChart size={18} />
      </button>
      
      {/* Steps window */}
      <div id="steps-window">
        <div id="steps">{progressText}</div>
        <div id="game-progress-bar"></div>
      </div>
    </>
  );
};

export default GameProgress;