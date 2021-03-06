import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

export default function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    const { pages: { login } } = routes;
    auth.logOut();
    navigate(login);
  };

  return (
    <Row className="justify-content-lg-center shadow-sm bg-white mb-5 p-3">
      <Col lg={8} className="d-flex justify-content-between">
        <a href={routes.pages.chat} className="navbar-brand text-dark">Hexlet Chat</a>
        {auth.logged ? <Button variant="dark" onClick={handleLogout}>{t('header.exitButton')}</Button> : null}
      </Col>
    </Row>
  );
}
