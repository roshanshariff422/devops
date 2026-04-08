import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-600 to-purple-500 relative overflow-hidden">

      {/* 🔥 GLOW EFFECTS */}
      <div className="absolute w-96 h-96 bg-purple-400 opacity-30 blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-96 h-96 bg-blue-400 opacity-30 blur-3xl bottom-[-100px] right-[-100px]"></div>

      {/* MAIN CONTENT */}
      <div className="text-center text-white z-10 px-6">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-6"
        >
          CampusCycle 🚀
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-xl mx-auto mb-8 opacity-90"
        >
          Buy, sell and reuse items within your campus community.
          Save money, reduce waste and make smarter choices.
        </motion.p>

        {/* FEATURES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mb-10 flex-wrap"
        >
          <span className="bg-white/20 px-4 py-2 rounded-full">📦 Buy</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">💰 Sell</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">♻ Reuse</span>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition"
        >
          Get Started →
        </motion.button>

      </div>

    </div>
  );
};

export default Landing;