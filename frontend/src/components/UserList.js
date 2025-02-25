import { useEffect, useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";

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
        setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
        setEditingUser(null);
    };
    return (
        <div>
            <h2>User List</h2>
            {editingUser ? (
                <EditUserForm
                    user={editingUser}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingUser(null)}
                />
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <td>Họ tên</td>
                            <td>Email</td>
                            <td>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => setEditingUser(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
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