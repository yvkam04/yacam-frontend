import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "lecteur" });
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Impossible de charger les utilisateurs.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await api.post("/register", newUser);
      setNewUser({ email: "", password: "", role: "lecteur" });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>YA Consulting — Utilisateurs</h1>
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
        {showForm ? "Annuler" : "+ Ajouter un utilisateur"}
      </button>

      {showForm && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginBottom: "20px", maxWidth: "400px" }}>
          <h3>Nouvel utilisateur</h3>
          <input
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
          >
            <option value="lecteur">Lecteur</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button
            onClick={handleAddUser}
            style={{ backgroundColor: "green", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Enregistrer
          </button>
        </div>
      )}

      {users.length === 0 ? (
        <p>Aucun utilisateur enregistré pour le moment.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ color: user.is_active ? "green" : "red" }}>
                  {user.is_active ? "Actif" : "Inactif"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;