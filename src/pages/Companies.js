import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: "" });
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/companies/");
      setCompanies(response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Impossible de charger les entreprises.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async () => {
    try {
      await api.post("/companies/", newCompany);
      setNewCompany({ name: "" });
      setShowForm(false);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de l'entreprise.");
    }
  };

  if (loading) return <p>Chargement des entreprises...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>YA Consulting — Entreprises</h1>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ backgroundColor: "#6c757d", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          ← Retour au Dashboard
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: "20px", backgroundColor: "#007bff", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        {showForm ? "Annuler" : "+ Ajouter une entreprise"}
      </button>

      {showForm && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginBottom: "20px", maxWidth: "400px" }}>
          <h3>Nouvelle entreprise</h3>
          <input
            placeholder="Nom de l'entreprise"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ name: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <button
            onClick={handleAddCompany}
            style={{ backgroundColor: "green", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Enregistrer
          </button>
        </div>
      )}

      {companies.length === 0 ? (
        <p>Aucune entreprise enregistrée pour le moment.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Companies;