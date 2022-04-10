import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { collection } from '@firebase/firestore';

export default function Login() {
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
      navigate(userRole[role]);
    } catch (err) {
      console.log('falied to login');
      console.error(err.message);
    }
  }

  return (
    <div className='body_wrap'>
    <Container
      id="text-color"
      className="loginForm text-black d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: '100vh' }}
    >
      <Card className="signUp frosted-card">
        <Card.Body>
          <h2 className="text-center mb-4">
            <strong class="text-white">Sign in to get started</strong>
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {<Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>
                <h4 className="title">Email</h4>
              </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
                <h4 className="title">Password</h4>
              </Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form> }
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}
