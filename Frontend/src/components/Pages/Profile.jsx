import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [authUser] = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const apiURL = "http://localhost:4000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${apiURL}/user/${authUser._id}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data.user);
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (authUser?._id) {
      fetchUser();
    }
  }, [authUser]);

  if (!userData) {
    return <div className="text-white text-center mt-10">Loading profile...</div>;
  }

  return (
    <div
      className="flex min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dirgheoeg/image/upload/v1743963012/Screenshot_2024-05-31_114657_ooiwh5.png')`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="flex w-full h-full bg-black bg-opacity-70 backdrop-blur-sm">
        {/* Sidebar */}
        <div className="w-64 p-6 border-r border-gray-700 bg-black bg-opacity-30">
          <div className="text-2xl font-bold mb-8">Profile</div>
          <ul className="space-y-4 text-gray-300">
            <li
              className="cursor-pointer hover:text-white transition duration-200"
              onClick={() => navigate("/favorites")}
            >
              ❤️ Favorites
            </li>
            <li
              className="cursor-pointer hover:text-white transition duration-200"
              onClick={() => navigate("/orders")}
            >
              📦 Order History
            </li>
            <li
              className="cursor-pointer hover:text-white transition duration-200"
              onClick={() => navigate("/settings")}
            >
              ⚙️ Settings
            </li>
          </ul>
        </div>

        {/* Profile Main */
         console.log("userData profile ->", userData.profilePic)
        }
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="flex items-center space-x-6 bg-black bg-opacity-30 p-6 rounded-2xl shadow-lg">
            {userData.profilePic ? (
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-600 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-700 text-white text-4xl rounded-full flex items-center justify-center border-4 border-gray-600 shadow-md">
                {userData.fullname.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-3xl font-semibold">{userData.fullname}</h2>
              <p className="text-gray-300">{userData.email}</p>
              <p className="text-sm text-gray-400 mt-1">Role: {userData.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
