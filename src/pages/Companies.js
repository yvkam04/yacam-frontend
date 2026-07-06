import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../logo.png";
import Footer from "./Footer";

function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nom: "", domaine: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/companies/");
      setCompanies(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    fetchCompanies();
  }, []);

  const save = async () => {
    try {
      if (editId) {
        await api.put(`/companies/${editId}`, form);
      } else {
        await api.post("/companies/", form);
      }
      setShowModal(false);
      setForm({ nom: "", domaine: "" });
      setEditId(null);
      fetchCompanies();
    } catch (e) {}
  };

  const del = async (id) => {
    if (!window.confirm("Supprimer cette entreprise ?")) return;
    await api.delete(`/companies/${id}`);
    fetchCompanies();
  };

  const filtered = companies.filter((c) =>
    (c.nom || c.name)?.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          <button onClick={() => navigate("/users")}
            style={{ color: "white", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
            👥 Utilisateurs
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
            <h1 style={{ color: "#1e293b", fontWeight: 800, fontSize: "1.8rem", margin: 0 }}>🏢 Entreprises</h1>
            <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>{companies.length} entreprise(s) cliente(s)</p>
          </div>
          <button onClick={() => { setForm({ nom: "", domaine: "" }); setEditId(null); setShowModal(true); }}
            style={{ background: "linear-gradient(90deg, #1b3a6b, #2563eb)", color: "white", borderRadius: "8px", padding: "10px 20px", fontWeight: 600, border: "none", cursor: "pointer" }}>
            + Nouvelle entreprise
          </button>
        </div>

        <input placeholder="🔍 Rechercher..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db", marginBottom: "20px", width: "320px", outline: "none" }}
        />

        <div style={{ background: "white", borderRadius: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["ID", "Nom", "Domaine", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "14px 20px", color: "#64748b", fontWeight: 600, fontSize: "0.85rem", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Aucune entreprise trouvée</td></tr>
              ) : filtered.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <td style={{ padding: "14px 20px", color: "#94a3b8", fontFamily: "monospace" }}>#{c.id}</td>
                  <td style={{ padding: "14px 20px", fontWeight: 600, color: "#1e293b" }}>{c.nom || c.name}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "3px 10px", borderRadius: "20px", fontSize: "0.82rem" }}>
                      {c.domaine || c.domain || "—"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <button onClick={() => { setForm({ nom: c.nom || c.name, domaine: c.domaine || c.domain || "" }); setEditId(c.id); setShowModal(true); }}
                      style={{ marginRight: "8px", padding: "5px 12px", borderRadius: "6px", border: "1px solid #d1d5db", background: "white", cursor: "pointer" }}>✏️</button>
                    <button onClick={() => del(c.id)}
                      style={{ padding: "5px 12px", borderRadius: "6px", border: "none", background: "#fef2f2", color: "#dc2626", cursor: "pointer" }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "14px", padding: "32px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h5 style={{ fontWeight: 700, marginBottom: "20px", color: "#1e293b" }}>
              {editId ? "✏️ Modifier" : "➕ Nouvelle"} entreprise
            </h5>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", display: "block", marginBottom: "6px" }}>Nom</label>
              <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                placeholder="Ex: Société Générale"
                style={{ width: "100%", borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", display: "block", marginBottom: "6px" }}>Domaine</label>
              <input value={form.domaine} onChange={(e) => setForm({ ...form, domaine: e.target.value })}
                placeholder="Ex: societe.ci"
                style={{ width: "100%", borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #d1d5db", background: "white", cursor: "pointer" }}>Annuler</button>
              <button onClick={save}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg, #1b3a6b, #2563eb)", color: "white", cursor: "pointer", fontWeight: 600 }}>
                {editId ? "Enregistrer" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Companies;