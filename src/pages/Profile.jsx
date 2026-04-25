import { useState } from "react";
import { FiUser, FiChevronRight } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Zila", 
    username: "W-zila", 
    password: "mysecretpassword" 
  });

  const [editFormData, setEditFormData] = useState({ ...profileData });

  const handleEditClick = () => {
    setEditFormData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData({ ...editFormData });
    setIsEditing(false);
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
              
              <div className="flex flex-col items-center">
                <div className="bg-white text-[#D8A7CA] p-6 rounded-full mb-12">
                  <FiUser size={60} />
                </div>

                <div className="w-full max-w-2xl space-y-6">
                  <div className="flex items-center">
                    <label className="w-1/3 text-2xl font-light opacity-90">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={editFormData.name}
                      onChange={handleChange}
                      className="w-2/3 bg-[#FDF0F6] text-gray-800 text-xl px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-1/3 text-2xl font-light opacity-90">Username</label>
                    <input 
                      type="text" 
                      name="username"
                      value={editFormData.username}
                      onChange={handleChange}
                      className="w-2/3 bg-[#FDF0F6] text-gray-800 text-xl px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-1/3 text-2xl font-light opacity-90">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      value={editFormData.password}
                      onChange={handleChange}
                      className="w-2/3 bg-[#FDF0F6] text-gray-800 text-xl px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 tracking-widest"
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <button 
                      onClick={handleCancel}
                      className="bg-[#B894B9] text-white font-bold text-xl px-8 py-3 rounded-full hover:bg-opacity-80 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="bg-[#9B7DA8] text-white font-bold text-xl px-10 py-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all"
                    >
                      Save
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