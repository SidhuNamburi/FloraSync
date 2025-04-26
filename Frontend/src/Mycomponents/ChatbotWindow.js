import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ChatbotWindow.css';

const ChatbotWindow = ({ plant, onClose }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message only
    setMessages([
      {
        text: `Hello! I can help you with information about your ${plant.name}. What would you like to know?`,
        sender: 'bot',
      },
    ]);

    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Handle error if geolocation fails
        }
      );
    }
  }, [plant]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = { text: chatInput, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.post(
        'http://localhost:5000/api/chat/chatbot',
        {
          message: chatInput,
          plantInfo: {
            name: plant.name,
            species: plant.species,
            careDetails: {
              light: plant.light,
              water: plant.water,
              temp: plant.temp,
              humidity: plant.humidity,
            },
          },
          latitude,  // Pass latitude
          longitude, // Pass longitude
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          text:
            response.data.reply ||
            "I couldn't process that request. Please try again.",
          sender: 'bot',
        },
      ]);
    } catch (error) {
      console.error('Chatbot error:', error);
      let errorMessage = "Sorry, I'm having trouble responding right now.";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Your session has expired. Please log in again.';
          localStorage.removeItem('token');
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message === 'No authentication token found') {
        errorMessage = 'Please log in to use the chatbot.';
      }

      setMessages((prev) => [...prev, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mini-window-overlay">
      <div className="mini-window">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="plant-info">
          <h2>
            {plant.name} ({plant.species})
          </h2>
          <div className="plant-details-container">
            {plant.image && (
              <img
                src={plant.image}
                alt={plant.name}
                className="plant-image"
              />
            )}
            <div className="plant-care-details">
              <p>
                <strong>Light:</strong> {plant.light}
              </p>
              <p>
                <strong>Water:</strong> {plant.water}
              </p>
              <p>
                <strong>Temperature:</strong> {plant.temp}
              </p>
              <p>
                <strong>Humidity:</strong> {plant.humidity}
              </p>
            </div>
          </div>
        </div>

        <div className="chat-section">
          <h3>Chatbot 🤖</h3>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
                {isLoading && idx === messages.length - 1 && msg.sender === 'bot' && (
                  <span className="loading-dots"></span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <textarea
              value={chatInput}
              onChange={(e) => {
                setChatInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyPress}
              placeholder={`Ask about ${plant.name}...`}
              rows={1}
              className="chat-textarea"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Optionally, allow the user to input coordinates manually */}
        <div className="location-input">
          <label>
            Latitude:
            <input
              type="number"
              value={latitude || ''}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude"
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              value={longitude || ''}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Longitude"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWindow;
