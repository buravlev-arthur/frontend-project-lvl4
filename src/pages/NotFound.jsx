import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';

export default function NotFound() {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Row>
      <Col xs={10} md={8} lg={6} className="position-absolute top-50 start-50 translate-middle border p-5 bg-white shadow-sm">
        <h1 className="display-1 text-center">404</h1>
        <p className="lead text-center">{t('notFound.text')}</p>
        <nav className="text-center">
          {auth.userIsLogged() ? (
            <Link to={routes.pages.chat}>{t('notFound.chatLink')}</Link>
          ) : (
            <Link to={routes.pages.login}>{t('notFound.loginLink')}</Link>
          )}
        </nav>
      </Col>
    </Row>
  );
}
