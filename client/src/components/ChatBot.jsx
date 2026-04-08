import { useState } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I'm your assistant! Ask me anything.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  // 🔥 SIMPLE BOT LOGIC
  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("add")) return "Go to 'Add Listing' and fill the form.";
    if (msg.includes("price")) return "Use AI Suggestion 🤖 for best price.";
    if (msg.includes("sell")) return "Add clear image + good description.";
    if (msg.includes("hello")) return "Hey there! 👋";
    
    return "I didn't understand 😅 Try asking about selling or adding items.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    const botMsg = { text: getReply(input), sender: "bot" };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white 
        w-14 h-14 flex items-center justify-center rounded-full 
        shadow-lg cursor-pointer hover:scale-110 transition z-50"
      >
        🤖
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* HEADER */}
          <div className="bg-purple-600 text-white p-3 font-semibold">
            Assistant 🤖
          </div>

          {/* MESSAGES */}
          <div className="p-3 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[75%]
                ${msg.sender === "user"
                  ? "bg-purple-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-4"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatBot;