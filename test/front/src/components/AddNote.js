import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function AddNote() {
  const [note, setNote] = useState('');
  const { userData, setUserData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newUserData = {
      ...userData,
      notes: [...userData.notes, note]
    };
    try {
      await axios.post('http://localhost:5000/user_data', newUserData, {
        headers: { Authorization: token }
      });
      setUserData(newUserData);
      setNote('');
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="新增筆記"
      />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddNote;