import { useState } from "react";
import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";

const App = () => {
  const [newUser, setNewUser] = useState(null);

  return (
    <div className="container text-center">
      <h1>User Management</h1>
      <AddUserForm onUserAdded={setNewUser} />
      <UserList newUser={newUser} />
    </div>
  );
};

export default App;
