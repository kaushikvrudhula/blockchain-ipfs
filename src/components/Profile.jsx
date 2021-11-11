import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout, printUsers } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }
  useEffect(() => {
    printUsers();
  }, []);
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="mb-4 text-center">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <h5>
            <strong>Email:</strong> {currentUser.email}
          </h5>
        </Card.Body>
      </Card>
      <div className="mt-2 text-center w-100">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
