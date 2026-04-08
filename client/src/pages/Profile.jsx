import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const Profile = () => {
  const [user, setUser] = useState({});
  const [totalListings, setTotalListings] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);

    // ✅ FIX: LOAD IMAGE FROM USER (NOT GLOBAL)
    if (storedUser.profileImage) {
      setProfileImage(storedUser.profileImage);
    }

    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/listings");
        const data = await res.json();

        const myItems = data.filter(
          (item) => item.userEmail === storedUser.email
        );

        setTotalListings(myItems.length);

        const soldItems = myItems.filter(
          (item) => item.status === "sold"
        );
        setSoldCount(soldItems.length);

      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

 return (
  <MainLayout>
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl border border-white/30 
    p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">

      {/* 👤 PROFILE HEADER */}
      <div className="flex items-center gap-6 mb-10">

        {/* AVATAR */}
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl 
        border-4 border-white/40 hover:scale-110 transition duration-300">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 
            flex items-center justify-center text-white text-3xl font-bold">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
          )}
        </div>

        {/* USER INFO */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name || "User"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {user?.email || "No Email"}
          </p>
        </div>

      </div>

      {/* 🔥 IMAGE UPLOAD */}
      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
              const updatedUser = {
                ...user,
                profileImage: reader.result,
              };

              setUser(updatedUser);
              setProfileImage(reader.result);
              localStorage.setItem("user", JSON.stringify(updatedUser));
            };

            if (file) {
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-2 text-sm bg-white/50 rounded-lg border border-white/30 cursor-pointer"
        />
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white/70 p-6 rounded-2xl shadow hover:shadow-2xl 
        hover:scale-105 transition duration-300 text-center">
          <p className="text-gray-500 text-sm mb-2">Total Listings</p>
          <p className="text-3xl font-bold text-purple-600">
            {totalListings}
          </p>
        </div>

        <div className="bg-white/70 p-6 rounded-2xl shadow hover:shadow-2xl 
        hover:scale-105 transition duration-300 text-center">
          <p className="text-gray-500 text-sm mb-2">Sold Items</p>
          <p className="text-3xl font-bold text-red-500">
            {soldCount}
          </p>
        </div>

        <div className="bg-white/70 p-6 rounded-2xl shadow hover:shadow-2xl 
        hover:scale-105 transition duration-300 text-center">
          <p className="text-gray-500 text-sm mb-2">Account Status</p>
          <p className="text-green-600 font-semibold text-lg">
            Active ✅
          </p>
        </div>

      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        className="mt-8 w-full bg-gradient-to-r from-red-500 to-pink-500 
        text-white p-3 rounded-xl font-semibold shadow-lg 
        hover:shadow-2xl hover:scale-105 active:scale-95 transition duration-300"
      >
        Logout
      </button>

    </div>
  </MainLayout>
);
};

export default Profile;