import React, { useRef, useState } from 'react';
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
} from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function SignUp() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userCategory, setuserCategory] = useState('Select Value');

  const data = [
    {
      value: 1,
      label: 'Teacher',
    },
    {
      value: 2,
      label: 'Superintendent',
    },
    {
      value: 3,
      label: 'COE',
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        userCategory
      );
      navigate('/profile');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  let handleChange = (e) => {
    setuserCategory(e.label);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center flex-column "
      style={{ minHeight:'100vh'}}
    >
      <Card className="signUp text-dark">
        <Card.Body>
          <h2 className="mb-5 text-center text-dark">
            <strong class="text-dark">Sign Up</strong>
          </h2>
          {error && <Alert variant="danger text-dark">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label><p class="text-dark">Email</p></Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label><p class="text-dark">Name</p></Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label><p class="text-dark">Password</p></Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label><p class="text-dark">Password Confirmation</p></Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group className="mt-4 text-center text-dark">
              <Select
                
                placeholder="Select User Category"
                value={userCategory.label} // set selected value
                options={data} // set list of the data
                onChange={handleChange} // assign onChange function
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="mt-2 w-100"
              type="submit"
              style={{ marginTop: 'rem' }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="mt-3 text-center w-100">
        Already Have Account? <Link to="/login">Log In</Link>
      </div>
      {/* {userCategory&&<h1>{userCategory}</h1>} */}
    </Container>
  );
}
