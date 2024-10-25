import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ user, logoutHandler }) {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container className="custom-navbar">
        <Navbar.Collapse className="justify-content-top">
          <Nav.Link as={Link} to="/">
            Главная
          </Nav.Link>
          <Nav.Link as={Link} to="/signupлщжлщжлщ">
            Рецепты
          </Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-bottom">
          <Nav className="ml-auto">
            <Nav>
              {user ? (
                <>
                  <Navbar.Text style={{ color: 'white' }}>
                    Рады приветствовать ❤, {user.name}
                  </Navbar.Text>
                  <Nav.Link
                    as={Link}
                    onClick={() =>
                      logoutHandler().then(() => navigate('/login'))
                    }
                    variant="outline-light"
                    className="ms-2"
                  >
                    Выйти
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup">
                    Регистрация
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Войти в профиль
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
