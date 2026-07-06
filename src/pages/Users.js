import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../logo.png";
import Footer from "./Footer";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    fetchUsers();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getRoleBadge = (role) => {
    const styles = {
      superadmin: { background: "#fef3c7", color: "#d97706" },
      admin: { background: "#eff6ff", color: "#2563eb" },
      lecteur: { background: "#f0fdf4", color: "#059669" },
    };
    return styles[role] || { background: "#f1f5f9", color: "#64748b" };
  };

  const filtered = users.filter((u) =>
    (u.email || u.username)?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", flexDirection: "column" }}>

      {/* Navbar */}
      <nav style={{
        background: "linear-gradient(90deg, #0d1b2a, #1b3a6b)",
        padding: "0 32px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "64px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={logo} alt="YA Consulting" style={{ height: "42px", objectFit: "contain" }} />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>YA Consulting</span>
          <span style={{ background: "#2563eb", color: "white", fontSize: "0.7rem", padding: "2px 8px", borderRadius: "20px", fontWeight: 600 }}>
            VIDÉOSURVEILLANCE
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => navigate("/dashboard")}
            style={{ color: "white", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
            🏠 Dashboard
          </button>
          <button onClick={() => navigate("/companies")}
            style={{ color: "white", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
            🏢 Entreprises
          </button>
          <button onClick={() => navigate("/cameras")}
            style={{ color: "white", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
            📹 Caméras
          </button>
          <button onClick={logout}
            style={{ color: "white", background: "#dc2626", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontWeight: 600 }}>
            🚪 Déconnexion
          </button>
        </div>
      </nav>

      {/* Contenu */}
      <div style={{ padding: "36px 40px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ color: "#1e293b", fontWeight: 800, fontSize: "1.8rem", margin: 0 }}>👥 Utilisateurs</h1>
            <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>{users.length} utilisateur(s) enregistré(s)</p>
          </div>
        </div>

        <input
          placeholder="🔍 Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db", marginBottom: "20px", width: "320px", outline: "none" }}
        />

        <div style={{ background: "white", borderRadius: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["ID", "Email", "Rôle", "Entreprise"].map((h) => (
                  <th key={h} style={{ padding: "14px 20px", color: "#64748b", fontWeight: 600, fontSize: "0.85rem", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Aucun utilisateur trouvé</td></tr>
              ) : filtered.map((u, i) => (
                <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <td style={{ padding: "14px 20px", color: "#94a3b8", fontFamily: "monospace" }}>#{u.id}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontWeight: 600, color: "#1e293b" }}>{u.email || u.username}</div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      ...getRoleBadge(u.role),
                      padding: "3px 10px", borderRadius: "20px",
                      fontSize: "0.82rem", fontWeight: 600,
                    }}>
                      {u.role || "—"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", color: "#64748b" }}>
                    {u.company_id || u.entreprise_id ? `#${u.company_id || u.entreprise_id}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Users;