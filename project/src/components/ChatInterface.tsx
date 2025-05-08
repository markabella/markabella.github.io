import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import { MessageSquare } from 'lucide-react';
import { sendMessageToConstruct, getMessageLogsFromRuntime } from '../utils/construct2Utils';
import { formatMessageLogsToHTML, toggleDisplay, toggleMessageNotification } from '../utils/uiUtils';

const ChatInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [lastLogHTML, setLastLogHTML] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  // Handle sending messages
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    sendMessageToConstruct(inputValue);
    setInputValue('');
    
    // Update messages
    displayMessages();
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Toggle chat window visibility
  const handleToggleChat = () => {
    toggleDisplay('#chat-window');
    toggleMessageNotification('off');
  };

  // Display messages from runtime
  const displayMessages = () => {
    try {
      const logs = getMessageLogsFromRuntime().arr;
      const html = formatMessageLogsToHTML(logs);
      
      if (lastLogHTML === html) {
        return;
      }
      
      toggleMessageNotification('on');
      setLastLogHTML(html);
      
      if (chatRef.current) {
        chatRef.current.innerHTML = html;
        
        // Scroll to bottom
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    } catch (err) {
      console.error('Error displaying messages:', err);
    }
  };

  // Update messages periodically
  useEffect(() => {
    const interval = setInterval(displayMessages, 250);
    return () => clearInterval(interval);
  }, [lastLogHTML]);

  // Store refs for jQuery to use
  useEffect(() => {
    // Set up jQuery handlers after component mounts
    $('#chat-input').on('keydown', (e) => {
      if (e.code === 'Enter') {
        handleSendMessage();
      }
    });

    return () => {
      // Clean up jQuery handlers
      $('#chat-input').off('keydown');
    };
  }, []);

  return (
    <>
      {/* Chat toggle button */}
      <button id="chat-window-toggle" className="ui-button" onClick={handleToggleChat}>
        <MessageSquare size={18} />
      </button>
      
      {/* Chat window */}
      <div id="chat-window">
        <div id="chat" ref={chatRef}></div>
        <div className="chat-input-container">
          <input
            id="chat-input"
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </>
  );
};

export default ChatInterface;