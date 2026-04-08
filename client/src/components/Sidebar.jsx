import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🔥 STYLE FOR ACTIVE LINK (UPDATED UI ONLY)
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition duration-300 
    ${isActive
      ? "bg-white/30 scale-[1.03] shadow-md"
      : "hover:bg-white/10 hover:translate-x-1"
    }`;

  return (
    <div className="w-64 h-full p-6 
      bg-gradient-to-b from-purple-700 via-purple-600 to-blue-600 
      text-white flex flex-col justify-between 
      shadow-2xl backdrop-blur-lg">

      {/* TOP */}
      <div>
        <h2 className="text-3xl font-extrabold mb-10 tracking-wide">
          CampusCycle
        </h2>

        <ul className="space-y-4">

          <li>
            <NavLink to="/dashboard" className={linkClass}>
              <span>🏠</span>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/browse" className={linkClass}>
              <span>🔍</span>
              <span>Browse Items</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/add" className={linkClass}>
              <span>➕</span>
              <span>Add Listing</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-listings" className={linkClass}>
              <span>📦</span>
              <span>My Listings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={linkClass}>
              <span>👤</span>
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
    <NavLink to="/messages" className={linkClass}>
      <span className="flex items-center gap-3">
        💬 Messages
      </span>
    </NavLink>
  </li>

        </ul>
      </div>

      {/* USER SECTION */}
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
        <p className="font-semibold text-lg">
          {user.name || "Guest User"}
        </p>
        <p className="text-sm text-gray-200 truncate">
          {user.email || "No Email"}
        </p>
      </div>

    </div>
  );
};

export default Sidebar;