"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // مهم للانتقال للداشبورد
import { FaGoogle, FaFacebookF, FaEnvelope, FaLock } from "react-icons/fa";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // تعريف الروتر

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      let data;

try {
  data = await res.json();
} catch {
  data = null;
}
      if (res.ok) {
        // التوكن الآن مخزن تلقائيًا في HttpOnly Cookie
        // لا حاجة لـ localStorage أو أي تغيير في الواجهة
        router.push("/dashboard"); // بعد تسجيل الدخول، ننتقل للداشبورد
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h2>Welcome Back</h2>
        <p>Manage your services, track your growth, and stay organized effortlessly.</p>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1>Login</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="signin-btn">Sign In</button>
          </form>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <div className="social-login">
            <button className="google"><FaGoogle /> Continue with Google</button>
            <button className="facebook"><FaFacebookF /> Continue with Facebook</button>
          </div>

          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
}
