import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/authSlice"; 
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);


    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      setToast({
        message: res.data.message,
        type: "success"
      });


      dispatch(setAuth(res.data));

      setTimeout(() => {
        setToast(null);
        navigate("/upload");
      }, 1500);
    } catch (err) {

      setToast({
        message: err.response?.data?.error || "Login failed",
        type: "error"
      });

    }
    finally {
      setTimeout(() => setToast(null), 3000);
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="logo-section">
          <h1>Login Page</h1>
          <p>Enter Login Details</p>
        </div>

        <form onSubmit={handleLogin}>

          {toast && (
            <div className={`toast ${toast.type}`}>
              {toast.message}
            </div>
          )}
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

          <button type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch">
          Not registered? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}