import { useState, useEffect } from 'react';
import { Card, Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import './MessagesPage.css'; 

function AddMessageForm({ handleSubmitForm }) {
  return (
    <Form onSubmit={handleSubmitForm} className="mb-5">
      <h2 className="mb-4">Хотите поделиться рецептом?</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control type="text" name="title" placeholder="Название блюда" required />
        </Col>
        <br />
        <Col md={6}>
          <Form.Control type="file" name="img" accept="image/*" />
        </Col>
      </Row>
      <br />
      <Form.Group className="mb-3">
        <Form.Control as="textarea" name="body" placeholder="Состав блюда" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Запостить
      </Button>
    </Form>
  );
}

function MessageCard({ message, onDelete, user }) {
  return (
    <Card className="mb-4 shadow-sm message-card">
      <Card.Body>
        <Card.Title as="h3" className="message-card-title">{message.title}</Card.Title>
        
        {message.img && (
          <div className="d-flex justify-content-center mb-3">
            <Image src={`http://localhost:3000/images/${message.img}`} alt={message.title} style={{ maxWidth: '300px' }} rounded />
          </div>
        )}

        {message.body && <Card.Text className="message-card-text">{message.body}</Card.Text>}

        <Row>
          <Col>
            <Button
              variant="danger"
              disabled={user?.id !== message.userId}
              onClick={onDelete}
              className="w-100 message-card-delete-button"
            >
              &#x2716; Удалить
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function MessagesPage({ user }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API_STRAIGHT}/messages`).then((response) => {
      setMessages(Array.isArray(response.data) ? response.data : []);
    }).catch((error) => {
      console.error(error);
      setMessages([]);
    });
  }, []);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    console.log("🚀 ~ handleSubmitForm ~ formData:", formData)

    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_API_STRAIGHT}/messages`, formData);
      // console.log("🚀 ~ handleSubmitForm ~ response:", response)
      if (response.status === 201) {
        setMessages((prev) => [response.data, ...prev]);
        formElement.reset();
      }
    } catch (error) {
      console.log(error, 'Ошибка отправки!!!!!')
      setError(error.response?.data?.text || 'Ошибка при добавлении сообщения');
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_STRAIGHT}/messages/${id}`);
      if (response.status === 204) {
        setMessages(messages.filter((message) => message.id !== id));
      }
    } catch (error) {
      setError(error.response?.data?.text || 'Ошибка при удалении сообщения');
    }
  };

  return (
    <Container className="py-5">
      {user && <AddMessageForm handleSubmitForm={handleSubmitForm} />}
      <br />
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message-card-wrapper">
            <MessageCard
              user={user}
              message={message}
              onDelete={() => handleDeletePost(message.id)}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
