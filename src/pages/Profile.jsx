import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const [profileData, setProfileData] = useState({
    name: "", 
    username: "", 
    password: "" 
  });

  const [editFormData, setEditFormData] = useState({ ...profileData });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      
      setProfileData({
        name: parsedUser.full_name,
        username: parsedUser.username,
        password: ""
      });
      
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleEditClick = () => {
    setEditFormData({ 
      name: profileData.name, 
      username: profileData.username, 
      password: "" 
    });
    setIsEditing(true);
    setStatusMessage({ text: "", type: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setStatusMessage({ text: "", type: "" });
  };

  const handleSave = async () => {
    if (!editFormData.name.trim() || !editFormData.username.trim()) {
      setStatusMessage({ text: "Name and Username cannot be empty!", type: "error" });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const response = await axios.put(`https://emovision-backend-production.up.railway.app/api/users/${userData.user_id}`, {
        full_name: editFormData.name,
        username: editFormData.username,    
        password: editFormData.password
      });

      setProfileData({
        name: response.data.data.full_name,
        username: response.data.data.username,
        password: "" 
      });

      const updatedSession = {
        ...userData,
        full_name: response.data.data.full_name,
        username: response.data.data.username
      };
      localStorage.setItem("user", JSON.stringify(updatedSession));
      setUserData(updatedSession);

      setIsEditing(false);
      setStatusMessage({ text: "Your profile has been successfully updated!", type: "success" });
      
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);

    } catch (error) {
      console.error("Failed to update profile:", error);
      setStatusMessage({ 
        text: error.response?.data?.message || "Failed to connect to the server.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-5 pt-20 md:p-10 max-w-4xl mx-auto w-full flex-grow">
          
          <h1 className="text-5xl font-bold text-gray-900 mb-10">Profile Setting</h1>

          {statusMessage.text && !isEditing && (
            <div className={`mb-6 p-4 rounded-xl font-bold text-center ${statusMessage.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {statusMessage.text}
            </div>
          )}

          <div className="bg-[#D8A7CA] rounded-[40px] p-12 shadow-xl text-white relative">
            
            {!isEditing ? (
              <>
                <div className="flex items-center gap-6 mb-12">
                  <div className="bg-white text-[#D8A7CA] p-4 rounded-full">
                    <FiUser size={50} />
                  </div>
                  <h2 className="text-4xl font-bold">Account Info</h2>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/40 pb-4 group cursor-pointer" onClick={handleEditClick}>
                    <span className="text-2xl font-light opacity-90">Name</span>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold">{profileData.name}</span>
                      <FiChevronRight size={30} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/40 pb-4 group cursor-pointer" onClick={handleEditClick}>
                    <span className="text-2xl font-light opacity-90">Username</span>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold">{profileData.username}</span>
                      <FiChevronRight size={30} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/40 pb-4 group cursor-pointer" onClick={handleEditClick}>
                    <span className="text-2xl font-light opacity-90">Password</span>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold tracking-widest">******</span>
                      <FiChevronRight size={30} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              
              <div className="flex flex-col items-center animate-fadeIn">
                <div className="bg-white text-[#D8A7CA] p-6 rounded-full mb-12">
                  <FiUser size={60} />
                </div>

                {statusMessage.text && isEditing && (
                  <div className="w-full max-w-2xl bg-red-500/20 text-white font-bold p-3 rounded-lg text-center mb-6">
                    {statusMessage.text}
                  </div>
                )}

                <div className="w-full max-w-2xl space-y-6">
                  <div className="flex items-center">
                    <label className="w-1/3 text-2xl font-light opacity-90">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={editFormData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-2/3 bg-[#FDF0F6] text-gray-800 text-xl px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-70"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-1/3 text-2xl font-light opacity-90">Username</label>
                    <input 
                      type="text" 
                      name="username"
                      value={editFormData.username}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-2/3 bg-[#FDF0F6] text-gray-800 text-xl px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-70"
                    />
                  </div>

                  <div className="flex items-center relative group">
                    <label className="w-1/3 text-2xl font-light opacity-90">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      placeholder="Kosongkan jika tidak ingin diubah"
                      value={editFormData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="new-password"
                      className="w-2/3 bg-[#FDF0F6] text-gray-800 text-xl px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 tracking-widest placeholder:tracking-normal placeholder:text-sm disabled:opacity-70"
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <button 
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="bg-[#B894B9] text-white font-bold text-xl px-8 py-3 rounded-full hover:bg-opacity-80 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-[#9B7DA8] text-white font-bold text-xl px-10 py-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}