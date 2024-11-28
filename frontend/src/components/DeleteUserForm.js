import React, { useState } from "react";
import { deleteUser } from "../api/users";
import "../styles/DeleteUserForm.css"; // CSS file for styling

const DeleteUserForm = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(userId); // User deletion logic
      alert("User deleted successfully!");
      setUserId(""); // Reset the form
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user: " + err.message); // Display error message
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete User</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteUserForm;
