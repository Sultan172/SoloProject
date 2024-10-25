import { useState } from 'react';
import { Form, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import './LoginPage.css';
export default function LoginPage({ loginHandler }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container className="mt-5" >
      <h1 className="text-center mb-4">Вход</h1>
      <Form onSubmit={(e) => loginHandler(e, formData)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <FormControl
            type="email"
            name="email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <InputGroup>
          <Form.Label>Пароль: </Form.Label>
            <FormControl
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Введите ваш пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <InputGroup.Text onClick={() => setShowPass((s) => !s)} style={{ cursor: 'pointer' }}>
              {showPass ? 'Скрыть' : 'Показать'}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" size="lg" className="w-100">
          Войти
        </Button>
      </Form>
    </Container>
  );
}
