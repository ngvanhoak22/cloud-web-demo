import { useState } from "react";
import axios from "axios";

const EditUserForm = ({ user, onUpdate, onCancel }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8081/api/users/${user._id}`, {
                name,
                email,
            });
            onUpdate(response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditUserForm;