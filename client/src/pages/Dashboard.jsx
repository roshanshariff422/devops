import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatBot from "../components/ChatBot";

const Dashboard = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/listings");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  const handleInterest = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) {
        alert("Please login first");
        return;
      }

      const res = await fetch("http://localhost:5000/api/listings/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sellerEmail: item.userEmail,
          itemTitle: item.title,
          buyerEmail: user.email,
          listingId: item._id,
        }),
      });

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
  <MainLayout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >

      {/* HEADER */}
      <Header />

      {/* ================= STATS ================= */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 max-w-6xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/60 backdrop-blur-lg border border-white/30 
          p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p className="text-gray-500 text-sm flex items-center gap-2">
            📊 Total Listings
          </p>
          <h2 className="text-3xl font-bold mt-2">{listings.length}</h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/60 backdrop-blur-lg border border-white/30 
          p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p className="text-gray-500 text-sm flex items-center gap-2">
            🟢 Active Listings
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {listings.filter(item => item.status !== "sold").length}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/60 backdrop-blur-lg border border-white/30 
          p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p className="text-gray-500 text-sm flex items-center gap-2">
            🔴 Sold Items
          </p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {listings.filter(item => item.status === "sold").length}
          </h2>
        </motion.div>

      </div>

      {/* ================= ITEMS ================= */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 max-w-6xl mx-auto">
        {listings
  .filter(item => item.status !== "sold")
  .map((item, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}

      // 🔥 ADDED NAVIGATION
      onClick={() => navigate(`/product/${item._id}`, { state: item })}

      // 🔥 ADDED cursor-pointer ONLY
      className="cursor-pointer bg-white/60 backdrop-blur-lg border border-white/30 
      p-4 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
    >

      {/* IMAGE */}
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt="item"
        className="h-32 w-full object-cover rounded-lg mb-3"
      />

      {/* TITLE */}
      <h3 className="font-bold text-lg mb-1">{item.title}</h3>

      {/* PRICE */}
      <p className="text-gray-700 font-semibold">
        ₹{item.price} • {item.condition}
      </p>

      {/* SELLER */}
      <p className="text-sm text-gray-400 mt-1">
        Seller: {item.userEmail}
      </p>

      {/* BUTTON */}
      <div className="mt-4">
        <motion.button
          // 🔥 FIX: STOP CARD CLICK
          onClick={(e) => {
            e.stopPropagation();
            handleInterest(item);
          }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 
          text-white py-2 rounded-lg shadow hover:shadow-lg 
          transition duration-200"
        >
          Interested
        </motion.button>
      </div>

    </motion.div>
  ))}
      </div>

    </motion.div>
    <ChatBot />
  </MainLayout>
);
};

export default Dashboard;