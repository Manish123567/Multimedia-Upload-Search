import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);


    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      setToast({
        message: res.data.message,
        type: "success"
      });

      setTimeout(() => {
        setToast(null);
        navigate("/");
      }, 1500);
    } catch (err) {
      setToast({
        message: err.response?.data?.error || "Registration failed",
        type: "error"
      });


    } finally {
      setTimeout(() => setToast(null), 3000);
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="logo-section">
          <h1>Create Account</h1>
          <p>Enter Details</p>
        </div>

        <form onSubmit={handleRegister}>
          {toast && (
            <div className={`toast ${toast.type}`}>
              {toast.message}
            </div>
          )}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="id@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="switch">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
