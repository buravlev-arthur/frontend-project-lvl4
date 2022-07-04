import React, { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <Row className="justify-content-lg-center shadow-sm bg-white mb-5 p-3">
      <Col lg={8} className="d-flex justify-content-between">
        <a href="/" className="navbar-brand text-dark">Hexlet Chat</a>
        {auth.logged ? <Button variant="dark" onClick={auth.logOut}>Выйти</Button> : null}
      </Col>
    </Row>
  );
};

export default Header;