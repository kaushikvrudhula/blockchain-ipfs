import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { collection } from '@firebase/firestore';

export default function Login({ setUser }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, getRole, loggedin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userRole = { Teacher: '/teacher', COE: '/coe', Super: '/super' };
  console.log('Login Component called');
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      const role = await getRole(emailRef.current.value);
      console.log(emailRef.current.value, role);
      navigate(userRole[role]);
    } catch (err) {
      console.log('falied to login');
      console.error(err.message);
    }
  }

  return (
    <div className="body_wrap">
      <Card className="position-absolute h-50 w-25 top-50 start-50 translate-middle bg-transparent">
        <Card.Body className="w-100 h-100 d-flex flex-column bg-black bg-opacity-25 justify-content-space-evenly">
          <h2 className="text-center mt-2 mb-4">
            <strong class="text-white">Sign in Portal</strong>
          </h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form
            className="h-100 d-flex flex-column justify-content-space-evenly align-items-center"
            onSubmit={handleSubmit}
          >
            <Form.Group id="email" className="pt-5 pb-4 w-50">
              <Form.Label>
                <h4 className="text-white">Email</h4>
              </Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                className="bg-black text-white"
                required
              />
            </Form.Group>
            <Form.Group id="password" className="pb-5 w-50">
              <Form.Label>
                <h4 className="text-white">Password</h4>
              </Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                className="bg-black text-white"
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-25 mt-3 bg-gradient bg-light text-dark"
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
