import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../logo.png";
import Footer from "./Footer";

function Cameras() {
  const navigate = useNavigate();
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [form, setForm] = useState({
    nom: "",
    adresse_ip: "",
    port: "554",
    login: "admin",
    password: "",
    localisation: "",
  });

  const fetchCameras = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cameras/");
      setCameras(Array.isArray(res.data) ? res.data : []);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    fetchCameras();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const save = async () => {
    try {
      await api.post("/cameras/", form);
      setShowModal(false);
      setForm({ nom: "", adresse_ip: "", port: "554", login: "admin", password: "", localisation: "" });
      fetchCameras();
    } catch (e) {
      alert("Erreur lors de l'ajout de la caméra");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Supprimer cette caméra ?")) return;
    await api.delete(`/cameras/${id}`);
    fetchCameras();
  };

  const getStatusBadge = (status) => {
    if (status === "active" || status === "en_ligne") {
      return { background: "#f0fdf4", color: "#059669", label: "🟢 En ligne" };
    }
    return { background: "#fef2f2", color: "#dc2626", label: "🔴 Hors ligne" };
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
      <div style={{ padding: "36px 40px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ color: "#1e293b", fontWeight: 800, fontSize: "1.8rem", margin: 0 }}>📹 Caméras</h1>
            <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>{cameras.length} caméra(s) enregistrée(s)</p>
          </div>
          <button onClick={() => setShowModal(true)}
            style={{ background: "linear-gradient(90deg, #1b3a6b, #2563eb)", color: "white", borderRadius: "8px", padding: "10px 20px", fontWeight: 600, border: "none", cursor: "pointer" }}>
            + Ajouter une caméra
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>Chargement...</div>
        ) : cameras.length === 0 ? (
          <div style={{
            background: "white", borderRadius: "16px", padding: "60px",
            textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>📹</div>
            <h3 style={{ color: "#1e293b", fontWeight: 700, marginBottom: "8px" }}>
              Aucune caméra configurée
            </h3>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              Ajoutez vos caméras IP pour commencer la surveillance
            </p>
            <button onClick={() => setShowModal(true)}
              style={{ background: "linear-gradient(90deg, #1b3a6b, #2563eb)", color: "white", borderRadius: "8px", padding: "12px 24px", fontWeight: 600, border: "none", cursor: "pointer" }}>
              + Ajouter ma première caméra
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {cameras.map((cam) => {
              const badge = getStatusBadge(cam.status);
              return (
                <div key={cam.id} style={{
                  background: "white", borderRadius: "14px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  overflow: "hidden", border: "1px solid #e2e8f0",
                }}>
                  <div style={{
                    background: "#0d1b2a", height: "180px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    {cam.stream_url ? (
                      <video src={cam.stream_url} autoPlay muted
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ textAlign: "center", color: "#64748b" }}>
                        <div style={{ fontSize: "3rem", marginBottom: "8px" }}>📷</div>
                        <div style={{ fontSize: "0.85rem" }}>Flux non disponible</div>
                        <div style={{ fontSize: "0.75rem", marginTop: "4px", color: "#475569" }}>
                          Connectez la caméra pour voir le flux
                        </div>
                      </div>
                    )}
                    <span style={{
                      position: "absolute", top: "10px", right: "10px",
                      ...badge, padding: "3px 10px", borderRadius: "20px",
                      fontSize: "0.78rem", fontWeight: 600,
                    }}>
                      {badge.label}
                    </span>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "1rem", marginBottom: "4px" }}>
                      {cam.nom}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "4px" }}>
                      📍 {cam.localisation || "Localisation non définie"}
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "monospace", marginBottom: "12px" }}>
                      {cam.adresse_ip}:{cam.port || 554}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => setSelectedCamera(cam)}
                        style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none", background: "#eff6ff", color: "#2563eb", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
                        👁️ Voir le flux
                      </button>
                      <button onClick={() => del(cam.id)}
                        style={{ padding: "8px 12px", borderRadius: "6px", border: "none", background: "#fef2f2", color: "#dc2626", cursor: "pointer" }}>
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />

      {/* Modal Ajouter */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: "14px", padding: "32px", width: "480px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            <h5 style={{ fontWeight: 700, marginBottom: "20px", color: "#1e293b" }}>➕ Ajouter une caméra</h5>
            {[
              { label: "Nom de la caméra", key: "nom", placeholder: "Ex: Caméra Entrée" },
              { label: "Adresse IP", key: "adresse_ip", placeholder: "Ex: 192.168.1.100" },
              { label: "Port RTSP", key: "port", placeholder: "554" },
              { label: "Login", key: "login", placeholder: "admin" },
              { label: "Mot de passe", key: "password", placeholder: "••••••••", type: "password" },
              { label: "Localisation", key: "localisation", placeholder: "Ex: Hall d'entrée" },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: "14px" }}>
                <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", display: "block", marginBottom: "6px" }}>
                  {field.label}
                </label>
                <input type={field.type || "text"} value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={{ width: "100%", borderRadius: "8px", padding: "10px 14px", border: "1.5px solid #d1d5db", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "8px", padding: "12px", marginBottom: "20px", fontSize: "0.85rem", color: "#92400e" }}>
              ⚠️ URL RTSP générée : <code>rtsp://login:password@IP:port/stream</code>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #d1d5db", background: "white", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={save}
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "linear-gradient(90deg, #1b3a6b, #2563eb)", color: "white", cursor: "pointer", fontWeight: 600 }}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Voir flux */}
      {selectedCamera && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#0d1b2a", borderRadius: "14px", padding: "24px", width: "700px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h5 style={{ color: "white", fontWeight: 700, margin: 0 }}>📹 {selectedCamera.nom}</h5>
              <button onClick={() => setSelectedCamera(null)}
                style={{ background: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
                ✕ Fermer
              </button>
            </div>
            <div style={{ background: "#1e293b", borderRadius: "8px", height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", color: "#64748b" }}>
                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📡</div>
                <div style={{ fontWeight: 600, color: "#94a3b8", marginBottom: "8px" }}>Flux RTSP</div>
                <code style={{ color: "#2563eb", fontSize: "0.85rem" }}>
                  rtsp://{selectedCamera.login}:***@{selectedCamera.adresse_ip}:{selectedCamera.port}/stream
                </code>
                <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "12px" }}>
                  Connectez la caméra au réseau pour activer le flux
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cameras;