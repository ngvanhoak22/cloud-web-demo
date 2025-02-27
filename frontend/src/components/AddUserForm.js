import { useState } from "react";
import axios from "axios";
import "../App.css";
const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/users", {
        name,
        email,
      });
      onUserAdded(response.data);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="row">
        <input
          className="form-control mt-3"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-control mt-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="mt-3 btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
