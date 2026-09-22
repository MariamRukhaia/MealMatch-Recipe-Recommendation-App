import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", {
        full_name: name,
        email,
        username,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("username", username); 
        navigate("/onboarding"); 
      }
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Registration failed.");    }
  };

  return (
    <div className="flex flex-col justify-start items-center mt-32">
      <p className="text-3xl font-bold mb-6">Set Up User Credentials</p>
      <form onSubmit={handleSubmit} className="w-[400px]">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center w-full">
            <label htmlFor="name" className="font-bold text-[#F1A030] w-40">
              Full Name
            </label>
            <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full" />
          </div>
          <div className="flex justify-between items-center w-full">
            <label htmlFor="email" className="font-bold text-[#F1A030] w-40">
              Email Address
            </label>
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full" />
          </div>
          <div className="flex justify-between items-center w-full">
            <label htmlFor="username" className="font-bold text-[#F1A030] w-40">
              Username
            </label>
            <input type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full" />
          </div>
          <div className="flex justify-between items-center w-full">
            <label htmlFor="password" className="font-bold text-[#F1A030] w-40">
              Password
            </label>
            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
