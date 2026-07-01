import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "420px" }}>
        
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">YA Consulting</h2>
          <p className="text-muted">Plateforme de Vidéosurveillance Cloud</p>
        </div>

        <h5 className="mb-3">Connexion</h5>

        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        <div className="mb-3">
          <label className="form-label">Adresse e-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder="exemple@yaconsulting.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Se connecter
        </button>

        <p className="text-center text-muted mt-3" style={{ fontSize: "12px" }}>
          © 2026 YA Consulting — Tous droits réservés
        </p>
      </div>
    </div>
  );
}

export default Login;