import { useState } from "react";
import axios from "axios";
import Button from "./Button"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://127.0.0.1:5000/api/login", {
            username,
            password
        });

        setMessage(response.data.message);
        console.log("Login successful:", response.data);
        localStorage.setItem("username", username);
        navigate("/cuisine");

    } catch (error) {
        setMessage(error.response?.data?.error || "An error occurred");
        console.error("Login error:", error);
    }
  };
  return (
    <div className='flex flex-col justify-start items-center mt-36'>
      <p className="text-3xl font-bold">User Sign In</p>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-start items-center gap-y-4'>
        <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='border-2 rounded-md  px-2 py-3 mt-5 w-80'
        />
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 rounded-md px-2 py-3 w-80' 
        />
        <Button type="submit">Sign In</Button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SignIn