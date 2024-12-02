import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../../redux/action/UserAction"
import { useNavigate } from 'react-router-dom';
const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, register_error } = useSelector((state) => state.user);

  const [error, setError] = useState(null)

  if (currentUser != null)
  {
    navigate('/');
  }

  useEffect(() => {
    setError(register_error)
  }, [dispatch, register_error]);

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // This will show if form data is being passed
    dispatch(authUser(formData)); // Dispatch the action
  };
  
  return (
    <Container className="my-5">
      <h2 className="mt-3 mb-3">Авторизація</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="login">
              <Form.Label className="mt-2">Логін:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your login"
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="password">
              <Form.Label className="mt-2">Пароль:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}  
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {error ? <Alert variant='danger' className='mt-3'>{error}</Alert> : ""}

        <Button variant="primary" type="submit" className="mt-2 w-100">Авторизація</Button>
      </Form>
    </Container>
  );
};

export default AuthorizationPage;