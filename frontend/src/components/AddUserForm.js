import React, { useState } from 'react';
import { addUser } from '../api/users';
import '../styles/AddUserForm.css'; // CSS file for styling

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { 
        name, 
        surname, 
        contact_number: contactNumber, 
        address, 
        email, 
        occupation 
      };
      await addUser(userData);
      alert('User added successfully!');
      // Reset form
      setName('');
      setSurname('');
      setContactNumber('');
      setAddress('');
      setEmail('');
      setOccupation('');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      alert('Failed to add user: ' + error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddUserForm;
