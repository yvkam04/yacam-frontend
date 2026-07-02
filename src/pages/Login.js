import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
      const response = await api.post("/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d1b2a 0%, #1b3a6b 60%, #2563eb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.97)",
        borderRadius: "18px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            background: "linear-gradient(135deg, #0d1b2a, #1b3a6b)",
            borderRadius: "16px",
            width: "140px",
            height: "140px",
            margin: "0 auto 16px auto",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              src={logo}
              alt="YA Consulting"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                display: "block",
              }}
            />
          </div>
          <h2 style={{ color: "#1b3a6b", fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
            YA Consulting
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginTop: "6px" }}>
            Plateforme de Vidéosurveillance Cloud
          </p>
        </div>

        {/* Erreur */}
        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            color: "#dc2626",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "16px",
            fontSize: "0.88rem"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", display: "block", marginBottom: "6px" }}>
            Adresse e-mail
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="exemple@yaconsulting.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db" }}
          />
        </div>

        {/* Mot de passe */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", display: "block", marginBottom: "6px" }}>
            Mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db" }}
          />
        </div>

        {/* Bouton */}
        <button
          onClick={handleLogin}
          className="btn w-100"
          style={{
            background: "linear-gradient(90deg, #1b3a6b, #2563eb)",
            color: "white",
            borderRadius: "8px",
            padding: "12px",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
          }}
        >
          🔐 Se connecter
        </button>

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.78rem", marginTop: "24px", marginBottom: 0 }}>
          © 2026 YA Consulting — Tous droits réservés
        </p>
      </div>
    </div>
  );
}

export default Login;