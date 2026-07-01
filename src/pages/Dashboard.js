import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCamera, setNewCamera] = useState({
    nom: "",
    adresse_ip: "",
    port: 554,
    localisation: "",
    actif: true,
  });
  const navigate = useNavigate();

  const fetchCameras = async () => {
    try {
      const response = await api.get("/cameras/");
      setCameras(response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Impossible de charger les caméras.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddCamera = async () => {
    try {
      await api.post("/cameras/", newCamera);
      setNewCamera({ nom: "", adresse_ip: "", port: 554, localisation: "", actif: true });
      setShowForm(false);
      fetchCameras(); // recharge la liste
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la caméra.");
    }
  };

  if (loading) return <p>Chargement des caméras...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1>YA Consulting — Mes Caméras</h1>
  <div>
    <button
      onClick={() => navigate("/companies")}
      style={{ backgroundColor: "#28a745", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}
    >
      🏢 Entreprises
    </button>
    <button
      onClick={() => navigate("/users")}
      style={{ backgroundColor: "#6f42c1", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}
    >
      👥 Utilisateurs
    </button>
    <button
      onClick={handleLogout}
      style={{ backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
    >
      Se déconnecter
    </button>
  </div>
</div>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: "20px", backgroundColor: "#007bff", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        {showForm ? "Annuler" : "+ Ajouter une caméra"}
      </button>

      {showForm && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginBottom: "20px", maxWidth: "400px" }}>
          <h3>Nouvelle caméra</h3>
          <input
            placeholder="Nom"
            value={newCamera.nom}
            onChange={(e) => setNewCamera({ ...newCamera, nom: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <input
            placeholder="Adresse IP"
            value={newCamera.adresse_ip}
            onChange={(e) => setNewCamera({ ...newCamera, adresse_ip: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <input
            placeholder="Port (défaut: 554)"
            type="number"
            value={newCamera.port}
            onChange={(e) => setNewCamera({ ...newCamera, port: parseInt(e.target.value) })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <input
            placeholder="Localisation"
            value={newCamera.localisation}
            onChange={(e) => setNewCamera({ ...newCamera, localisation: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <button
            onClick={handleAddCamera}
            style={{ backgroundColor: "green", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Enregistrer
          </button>
        </div>
      )}

      {cameras.length === 0 ? (
        <p>Aucune caméra enregistrée pour le moment.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse IP</th>
              <th>Port</th>
              <th>Localisation</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id}>
                <td>{camera.nom}</td>
                <td>{camera.adresse_ip}</td>
                <td>{camera.port}</td>
                <td>{camera.localisation || "—"}</td>
                <td style={{ color: camera.actif ? "green" : "red" }}>
                  {camera.actif ? "Actif" : "Inactif"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;