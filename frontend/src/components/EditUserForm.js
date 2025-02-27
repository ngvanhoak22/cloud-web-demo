import { useState } from "react";
import axios from "axios";
import "../App.css";
const EditUserForm = ({ user, onUpdate, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8081/api/users/${user._id}`,
        {
          name,
          email,
        }
      );
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-7">
        <input
          className="form-control mt-3"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-control mt-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-success mt-3 me-3" type="submit">
          Update
        </button>
        <button
          className="btn btn-danger mt-3"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
