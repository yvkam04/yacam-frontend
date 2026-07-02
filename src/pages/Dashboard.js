import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../logo.png";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ entreprises: 0, utilisateurs: 0, cameras: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    Promise.all([
      api.get("/companies/"),
      api.get("/users/"),
    ]).then(([companies, users]) => {
      setStats({
        entreprises: Array.isArray(companies.data) ? companies.data.length : 0,
        utilisateurs: Array.isArray(users.data) ? users.data.length : 0,
        cameras: 0,
      });
    }).catch(() => {});
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Navbar */}
      <nav style={{
        background: "linear-gradient(90deg, #0d1b2a, #1b3a6b)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={logo} alt="YA Consulting" style={{ height: "42px", objectFit: "contain" }} />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>YA Consulting</span>
          <span style={{
            background: "#2563eb", color: "white", fontSize: "0.7rem",
            padding: "2px 8px", borderRadius: "20px", fontWeight: 600,
          }}>VIDÉOSURVEILLANCE</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => navigate("/companies")}
            style={{ color: "white", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
            🏢 Entreprises
          </button>
          <button onClick={() => navigate("/users")}
            style={{ color: "white", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
            👥 Utilisateurs
          </button>
          <button onClick={logout}
            style={{ color: "white", background: "#dc2626", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontWeight: 600 }}>
            🚪 Déconnexion
          </button>
        </div>
      </nav>

      {/* Contenu */}
      <div style={{ padding: "36px 40px" }}>
        <h1 style={{ color: "#1e293b", fontWeight: 800, fontSize: "1.8rem", marginBottom: "4px" }}>
          Tableau de bord
        </h1>
        <p style={{ color: "#64748b", marginBottom: "32px" }}>
          Vue globale de la plateforme de vidéosurveillance
        </p>

        {/* Cartes stats */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "40px", flexWrap: "wrap" }}>
          {[
            { icon: "🏢", label: "Entreprises clientes", value: stats.entreprises, color: "#2563eb" },
            { icon: "👥", label: "Utilisateurs actifs", value: stats.utilisateurs, color: "#059669" },
            { icon: "📹", label: "Caméras connectées", value: stats.cameras, color: "#d97706" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "white",
              borderRadius: "14px",
              padding: "28px 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              borderLeft: `5px solid ${s.color}`,
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: "1",
              minWidth: "200px",
            }}>
              <div style={{
                width: "54px", height: "54px",
                borderRadius: "12px",
                background: `${s.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.6rem",
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b" }}>{s.value}</div>
                <div style={{ color: "#64748b", fontSize: "0.88rem", fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <h4 style={{ color: "#1e293b", fontWeight: 700, marginBottom: "16px" }}>
          Actions rapides
        </h4>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { icon: "🏢", label: "Gérer les entreprises", desc: "Ajouter, modifier, supprimer", path: "/companies", color: "#2563eb" },
            { icon: "👥", label: "Gérer les utilisateurs", desc: "Droits et accès", path: "/users", color: "#059669" },
            { icon: "📹", label: "Caméras (à venir)", desc: "Flux en direct et archives", path: "#", color: "#9333ea" },
          ].map((item) => (
            <div key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #e2e8f0",
                flex: "1",
                minWidth: "200px",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>{item.label}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;