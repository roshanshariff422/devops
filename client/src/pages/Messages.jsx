import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useLocation } from "react-router-dom";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        name: "Rahul",
        item: "Lab Kit",
        messages: [
          { sender: "Rahul", text: "Is this available?" },
          { sender: "Me", text: "Yes, it is!" },
        ],
      },
      {
        id: 2,
        name: "Anjali",
        item: "Engineering Book",
        messages: [
          { sender: "Anjali", text: "Price negotiable?" },
        ],
      },
    ];

    setConversations(dummy);
  }, []);

  // 🔥 BACKEND FETCH (ADDED)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!user?.email) return;

        const res = await fetch(
          `https://devops-c5cj.onrender.com/api/messages/${user.email}`
        );
        const data = await res.json();

        const grouped = {};

        data.forEach((msg) => {
          const key =
            msg.sender === user.email
              ? msg.receiver + msg.item
              : msg.sender + msg.item;

          if (!grouped[key]) {
            grouped[key] = {
              id: key,
              name:
                msg.sender === user.email ? msg.receiver : msg.sender,
              item: msg.item,
              messages: [],
            };
          }

          grouped[key].messages.push({
            sender:
              msg.sender === user.email ? "Me" : grouped[key].name,
            text: msg.text,
          });
        });

        const chats = Object.values(grouped);

        // merge with existing dummy (no logic break)
        setConversations((prev) => [...chats, ...prev]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (location.state) {
      const newChat = {
        id: Date.now(),
        name: location.state.name,
        item: location.state.item,
        messages: [],
      };

      setConversations((prev) => {
        const exists = prev.find(
          (c) => c.name === newChat.name && c.item === newChat.item
        );

        if (exists) {
          setSelectedChat(exists);
          return prev;
        }

        setSelectedChat(newChat);
        return [newChat, ...prev];
      });
    }
  }, [location.state]);

  // 🔥 SEND MESSAGE (API ADDED ONLY)
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await fetch("http://localhost:5000/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: user.email,
          receiver: selectedChat.name,
          item: selectedChat.item,
          text: newMessage,
        }),
      });
    } catch (err) {
      console.log(err);
    }

    // 🔥 ORIGINAL LOGIC (UNCHANGED)
    const updated = conversations.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: "Me", text: newMessage },
          ],
        };
      }
      return chat;
    });

    setConversations(updated);
    setSelectedChat({
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        { sender: "Me", text: newMessage },
      ],
    });

    setNewMessage("");
  };

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          <h2 className="p-4 font-bold border-b text-lg flex items-center gap-2">
            💬 Chats
          </h2>

          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b cursor-pointer transition duration-200
                hover:bg-white/40
                ${selectedChat?.id === chat.id ? "bg-white/50" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
                  {chat.name[0]}
                </div>

                <div>
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-sm text-gray-500">{chat.item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-span-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-white/30">

          {!selectedChat ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-5xl mb-2">💬</div>
              <p>Select a chat to start messaging</p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="p-4 border-b flex items-center gap-3 bg-white/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
                  {selectedChat.name[0]}
                </div>

                <div>
                  <p className="font-semibold">{selectedChat.name}</p>
                  <p className="text-xs text-gray-500">{selectedChat.item}</p>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "Me"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm shadow-md max-w-xs
                      ${
                        msg.sender === "Me"
                          ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-br-none"
                          : "bg-white text-gray-700 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="p-4 border-t flex gap-3 bg-white/40">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-full border bg-white/80 backdrop-blur outline-none focus:ring-2 focus:ring-purple-400 transition"
                />

                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 rounded-full shadow hover:scale-105 active:scale-95 transition"
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </MainLayout>
  );
};

export default Messages;