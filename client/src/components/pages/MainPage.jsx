import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function MainPage() {
  return (
    <div>

      <div className="bg-success text-white text-center py-5">
        <Container>
          <h1 className="display-4">Добро пожаловать в Мир Сэндвичей!</h1>
          <img src={'https://img.freepik.com/free-vector/young-people-waving-hand-illustrations-collection_23-2148373634.jpg'} style={{ width: '300px', height: 'auto' }} className="logo" alt="Vite logo" />
          <p className="lead mt-3">
            Откройте для себя удивительный мир сэндвичей, где каждый бутерброд – это
            произведение искусства. Узнайте новые рецепты и поделитесь своими любимыми!
          </p>
          
        </Container>
      </div>


      <Container className="py-5">
        <h2 className="text-center mb-5">Почему выбрать наши сэндвичи?</h2>
        <img src={'https://klev.club/uploads/posts/2023-11/1698832076_klev-club-p-kartinki-chelovek-za-stolom-25.jpg'} style={{ width: '300px', height: 'auto' }} className="logo" alt="Vite logo" />
        <Row className="text-center">
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Уникальные рецепты</Card.Title>
                <Card.Text>
                  Наши сэндвичи сочетают в себе традиционные вкусы и новые кулинарные
                  эксперименты.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
              <img src={'https://img.freepik.com/premium-photo/friendship-day-background-design_1268765-3219.jpg?semt=ais_hybrid'} style={{ width: '300px', height: 'auto' }} className="logo" alt="Vite logo" />
                <Card.Title>Для каждого</Card.Title>
                <Card.Text>
                  Вегетарианские, мясные, сладкие или пикантные – у нас есть сэндвичи на
                  любой вкус!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      <div className="bg-dark text-white py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h5>Свяжитесь с нами</h5>
              <p>
                Github:{' '}
                <a
                  href="https://github.com/Sultan172"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/Sultan172
                </a>
              </p>
              <p>
                Телеграм:{' '}
                <a
                  href="https://t.me/demiurg172"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://t.me/demiurg172
                </a>
              </p>
              <p>&copy; 2024 Сэндвичи для всех. Все права защищены.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
