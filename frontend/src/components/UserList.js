import { useEffect, useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";
import "../App.css";

const UserList = ({ newUser }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [newUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (updatedUser) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setEditingUser(null);
  };
  return (
    <div className="mt-5">
      <h2>User List</h2>
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onUpdate={handleUpdate}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <table border="1" className="table">
          <thead>
            <tr className="table-primary">
              <th>Họ tên</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
