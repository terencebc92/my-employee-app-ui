import React, { useState } from "react";
import "./Chatbot.css";
import { chatUrl } from "../../config/config";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question = input) => {
    const newMessages = [...messages, { role: "user", text: question }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("http://pythonbe:5000/ask-stream", {
      method: "POST",
      body: JSON.stringify({ question: question }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || !response.body) {
      console.error("Error with stream");
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let botText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      let chunk = decoder.decode(value, { stream: true });

      if (chunk) {
        botText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          if (last?.role === "bot") {
            updated[updated.length - 1] = { role: "bot", text: botText };
          } else {
            updated.push({ role: "bot", text: botText });
          }
          return [...updated];
        });
      }
    }

    setLoading(false);
  };

  const suggestedQuestions = [
    "What skills does Terence have?",
    "Is Terence a good team player?",
    "What technologies has Terence worked with?",
    "Tell me about Terence's experience at Standard Chartered.",
  ];

  return (
    <div style={{ width: "100%" }}>
      <h2>Chat with qwen3:0.6b (Experimental)</h2>
      <p>Find out more about Terence's career and skills</p>
      <div style={{ marginBottom: "10px" }}>
        <strong>Suggested Questions:</strong>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "5px",
          }}
        >
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(question);
                sendMessage(question);
              }}
              disabled={loading}
              className="suggestion-button"
              style={{
                padding: "5px 10px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
        }}
        className="chat-box"
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.text}
          </p>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "10px", marginTop: "10px", marginRight: "10px" }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          // style={{ padding: "10px", marginTop: "10px" }}
          disabled={loading}
          className="chat-button"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
