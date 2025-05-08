/**
 * UI utility functions for the game UI
 */

import $ from 'jquery';

// Format message logs from the runtime into HTML
export const formatMessageLogsToHTML = (logs: any[][]): string => {
  let html = ''; // Stores html for message log
  
  for (let i = 0; i < logs.length; i++) {
    html += '\n';
    let message = logs[i][0][0];
    let klass = 'message ';
    
    if (message.match(/^<[\w]+> /g)) { // Checks for pattern of username in message
      message = message.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
      klass += 'player-chat ';
      html += `<div class="${klass}">${message}</div>`;
      continue;
    }
    
    if (message.match(/err/i)) { // Checks for "err" hopefully catching "error" at the same time
      klass += 'system-err ';
      html += `<div class="${klass}">${message}</div>`;
      continue;
    } else {
      html += `<div class="${klass}">${message}</div>`;
      continue;
    }
  }
  
  return html;
};

// Update the game progress bar based on percentage
export const updateGameProgressBar = (percent: number): void => {
  const progress_gradient = `linear-gradient(90deg, var(--red-accent) ${percent * 100}%, rgba(153, 153, 153, 0.6) ${percent * 100}%)`;
  $('#game-progress-bar').css('background', progress_gradient);
};

// Place UI elements to match the canvas size
export const placeUI = (): void => {
  $('#UI').css('width', $('#c2canvas').css('width'));
  $('#UI').css('height', $('#c2canvas').css('height'));
};

// Toggle visibility of UI elements
export const toggleDisplay = (itemId: string): void => {
  if ($(itemId).css('visibility') === 'hidden') {
    $(itemId).css('visibility', '');
    $(itemId).css('height', '');
    $(itemId).css('opacity', '');
    $(itemId).css('position', ''); // Empty string restores imported styling
  } else {
    $(itemId).css('visibility', 'hidden');
    $(itemId).css('height', '0px'); // Keep hidden elements from taking up space in flex containers
    $(itemId).css('opacity', '100');
    $(itemId).css('position', 'absolute');
  }
};

// Toggle message notification indicator
export const toggleMessageNotification = (state: 'on' | 'off'): void => {
  if (state === 'on' && $('#chat-window').css('visibility') === 'hidden') {
    $('#chat-window-toggle').addClass('red-bg');
  } else if (state === 'off') {
    $('#chat-window-toggle').removeClass('red-bg');
  }
};

// Toggle on/off value attribute
export const toggleValueOnOff = (itemId: string): string => {
  if ($(itemId).attr('value') === 'on') {
    $(itemId).attr('value', 'off');
    return 'off';
  }
  if ($(itemId).attr('value') === 'off') {
    $(itemId).attr('value', 'on');
    return 'on';
  }
  return '';
};