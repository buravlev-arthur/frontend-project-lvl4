import { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const { pages: { login } } = routes;
    auth.logOut();
    navigate(login);
  };

  return (
    <Row className="justify-content-lg-center shadow-sm bg-white mb-5 p-3">
      <Col lg={8} className="d-flex justify-content-between">
        <a href="/" className="navbar-brand text-dark">Hexlet Chat</a>
        {auth.logged ? <Button variant="dark" onClick={handleLogout}>Выйти</Button> : null}
      </Col>
    </Row>
  );
};

export default Header;