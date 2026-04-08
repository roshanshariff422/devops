import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-purple-200 relative overflow-hidden">

      {/* 🌟 BACKGROUND GLOW */}
      <div className="absolute w-[450px] h-[450px] bg-purple-400 opacity-25 blur-3xl top-[-120px] left-[-120px] pointer-events-none"></div>
      <div className="absolute w-[450px] h-[450px] bg-blue-400 opacity-25 blur-3xl bottom-[-120px] right-[-120px] pointer-events-none"></div>

      {/* Sidebar */}
      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-6 overflow-y-auto 
        bg-white/20 backdrop-blur-xl 
        rounded-l-[40px] 
        shadow-[0_0_40px_rgba(0,0,0,0.1)] 
        z-10 transition duration-300"
      >
        {children}
      </div>

    </div>
  );
};

export default MainLayout;