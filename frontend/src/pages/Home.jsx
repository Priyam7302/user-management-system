import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await instance.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await instance.delete(`/users/${id}`, { withCredentials: true });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading users...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Users</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "NA"}</td>
                <td className="action-cell">
                  <button
                    className="icon-btn edit"
                    onClick={() => navigate(`/edit/${user._id}`)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(user._id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
