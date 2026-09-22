import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    FullName: "",
    Email: "",
    Username: "",
    Diet: "",
    Allergies: "",
    Password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "success" or "error"

  // Fetch user profile from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/profile", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok) {
          setUser({
            FullName: data.FullName,
            Email: data.Email,
            Username: data.Username,
            Diet: data.Diet || "", // Default empty if not set
            Allergies: data.Allergies || "",
            Password: "", // Do not pre-fill password field
          });
        } else {
          setMessage(data.error || "Failed to load profile.");
          setMessageType("error");
        }
      } catch (error) {
        setMessage("Error fetching profile.");
        setMessageType("error");
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          FullName: user.FullName,
          Email: user.Email,
          Username: user.Username,
          Diet: user.Diet,
          Allergies: user.Allergies,
          Password: user.Password || null, // Only update password if provided
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        setMessageType("success");
      } else {
        setMessage(data.error || "Failed to update profile.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error updating profile.");
      setMessageType("error");
    }
  };

  return (
    <>
      <NavBar />

      <div className="container mx-auto p-6 max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Account Settings</h2>

        {message && (
          <p className={`text-center ${messageType === "error" ? "text-red-500" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="FullName"
              value={user.FullName}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              name="Username"
              value={user.Username}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Diet</label>
            <input
              type="text"
              name="Diet"
              value={user.Diet}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Food Allergies</label>
            <input
              type="text"
              name="Allergies"
              value={user.Allergies}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">New Password (optional)</label>
            <input
              type="password"
              name="Password"
              value={user.Password}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-[#F1A030] text-white px-6 py-2 rounded-md hover:bg-orange-600 w-full"
          >
            Update Profile
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/discover")}
            className="text-blue-500 hover:underline"
          >
            Back to Discover
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
