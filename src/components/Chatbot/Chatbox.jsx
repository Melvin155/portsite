import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const portfolioContext = `
  You are an assistant that answers questions about Melvin Arias's portfolio.
  Details:
  - Name: Melvin Arias
  - Field: Information Technology student
  - Education: Currently a student at Kean University studying Information Technology. Graduated from the County College of Morris in May 2022 with an A.A.S. in Information Technology and a certificate in Information Security. Graduated from Morris Hills High School in June 2019 with a high school diploma.
  - Relevant Courses - Internet & Web Page Design, Computer Science I, Foundations of Info Security, Network Security, Routing I, Digital Circuits & Systems, and many more. 
  - Skills: Experience in HTML, CSS, JavaScript, Python, and SQL. Experience with the softwares: Eclipse, VS Code, Microsoft Excel, Git, GitHub, MySQL, and WireShark.
  - Work Experience: Worked at Fedex as a Package Handler from March 2023 to July 2025. Worked at Shop Rite as a Night Crew Clerk from January 2021 to March 2023. Worked as a crew member at Wendy's from December 2019 to December 2020.
  - Contact: bonhomml@kean.edu
  Always answer as if you are part of the portfolio website. 
  Keep your responses concise and friendly.
  `;

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m Melvin's AI Chatbot. Ask me anything related to the website portfolio!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); 

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: portfolioContext },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botResponse = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I ran into an issue. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className={`chatbot ${isOpen ? "open" : "closed"}`}>
    {/* Minimize / Expand Button */}
    <button className="toggle-btn" onClick={toggleChat}>
      {isOpen ? "–" : "+"}
    </button>

    <div className="chat-content">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
);

}

export default Chatbot;
