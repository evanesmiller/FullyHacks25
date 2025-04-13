
import React, { useState, useEffect } from 'react';
import './DroneControl.css'

const DroneControl = () => {
  const [chatOutput, setChatOutput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [droneStatus, setDroneStatus] = useState('Connected');
  const [battery, setBattery] = useState('Unknown');

  const appendChatMessage = (htmlMessage) => {
    setChatOutput((prev) => prev + htmlMessage);
  };

  const sendCommand = (command, silent = false) => {
    if (!silent) {
      appendChatMessage(`<div class="system-message">Executing command: ${command}</div>`);
    }
    fetch('/execute_command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          if (command === 'battery') {
            setBattery(data.result + '%');
          }
          if (!silent) {
            appendChatMessage(`<div class="system-message">Result: ${data.result}</div>`);
          }
        } else {
          appendChatMessage(`<div class="system-message">Error: ${data.message}</div>`);
        }
      })
      .catch((err) => appendChatMessage(`<div class="system-message">Error: ${err.toString()}</div>`));
  };

  const sendChatMessage = () => {
    const message = chatInput.trim();
    if (!message) return;
    appendChatMessage(`<div class="user-message">You: ${message}</div>`);
    setChatInput('');
    appendChatMessage(`<div class="system-message">Assistant is thinking...</div>`);
    fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Remove the "Assistant is thinking..." message before adding the response.
        // (Here, for simplicity, we just append the response.)
        appendChatMessage(`<div class="assistant-message">Assistant: ${data.response}</div>`);
      })
      .catch((err) => appendChatMessage(`<div class="system-message">Error: ${err.toString()}</div>`));
  };

  useEffect(() => {
    appendChatMessage(`<div class="system-message">Welcome to the Tello Drone Control Panel!</div>`);
    sendCommand('battery', true);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Tello Drone Control Panel</h1>
        <p>Control your drone and view the live stream</p>
      </div>

      <div className="content">
        <div className="video-container">
          <h2>Live Video Feed</h2>
          <img src="/video_feed" alt="Drone video stream" className="video-feed" />
        </div>

        <div className="controls">
          <div className="quick-commands">
            <h2>Quick Commands</h2>
            <div className="command-grid">
              <button className="command-button" onClick={() => sendCommand('takeoff')}>Take Off</button>
              <button className="command-button" onClick={() => sendCommand('land')}>Land</button>
              <button className="command-button" onClick={() => sendCommand('emergency')}>Emergency Stop</button>
              <button className="command-button" onClick={() => sendCommand('battery')}>Check Battery</button>
              <button className="command-button" onClick={() => sendCommand('move_forward 30')}>Forward 30cm</button>
              <button className="command-button" onClick={() => sendCommand('rotate_clockwise 90')}>Rotate CW 90°</button>
            </div>
          </div>

          <div className="chatbot-container">
            <h2>AI Drone Assistant</h2>
            <div
              id="chatOutput"
              className="chat-output"
              dangerouslySetInnerHTML={{ __html: chatOutput }}
            ></div>
            <div className="chat-controls">
              <input
                type="text"
                id="chatInput"
                placeholder="Enter a command or ask a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') sendChatMessage();
                }}
              />
              <button id="sendButton" onClick={sendChatMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="status-bar">
        <div>Status: <span id="droneStatus">{droneStatus}</span></div>
        <div>Battery: <span id="batteryStatus" className="badge">{battery}</span></div>
        <button className="emergency-button" onClick={() => sendCommand('emergency')}>EMERGENCY STOP</button>
      </div>
    </div>
  );
};

export default DroneControl;
