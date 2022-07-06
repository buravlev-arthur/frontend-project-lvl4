import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

const NotFound = () => {
  const auth = useContext(AuthContext);

  return (
    <Row>
      <Col xs={10} md={8} lg={6} className="position-absolute top-50 start-50 translate-middle border p-5 bg-white shadow-sm">
        <h1 className="display-1 text-center">404</h1>
        <p className="lead text-center">Такой страницы нет, или нам здесь просто не рады...</p>
        <nav className="text-center">
          {auth.userIsLogged() ? (
            <Link to="/">Вернуться в чат</Link>
          ) : (
            <Link to="login">Войти</Link>
          )}
        </nav>
      </Col>
    </Row>
  );
};

export default NotFound;