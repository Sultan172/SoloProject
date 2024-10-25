import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function RegistrationPage({ registerHandler }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form onSubmit={(e) => registerHandler(e, formData)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Имя пользователя: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Введите имя пользователя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Подтверждение пароля: </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={
              formData.password !== formData.confirmPassword &&
              formData.confirmPassword.length > 0
            }
            required
          />
        </Form.Group>
          <br />

        <Button variant="primary" type="submit" className="w-100">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  );
}
