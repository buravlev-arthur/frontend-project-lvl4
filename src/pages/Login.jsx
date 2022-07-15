import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import routes from '../routes';
import Input from '../formElements/Input';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [authError, setAuthError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const { t } = useTranslation();

  yup.setLocale({
    mixed: {
      required: t('formErrors.required'),
    }
  });
  
  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  useEffect(() => {
    if (auth.userIsLogged()) {
      navigate(routes.pages.chat);
    }
  }, []);

  const submit = (formData, setSubmitting) => {
    axios.post(routes.login, formData)
      .then(({ data: { token } }) => {
        auth.logIn(token, formData.username);
        navigate(routes.pages.chat);
      })
      .catch((error) => {
        const { response: { status } } = error;

        if (status === 500) {
          toast.error(t('notification.loadingError'));
          rollbar.error(t('notification.loadingError'), error, { formData });
          return;
        };
        setAuthError(true);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={11} md={6} lg={3} className="rounded p-5 mt-5 shadow bg-white">
        <h1 className="display-6 mb-3">{t('login.header')}</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
        >
          {({ getFieldProps, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                id="userName"
                authError={String(authError)}
                type="text"
                label={t('login.username')}
                {...getFieldProps('username')}
              />

              <Input
                id="password"
                authError={String(authError)}
                type="password"
                label={t('login.password')}
                {...getFieldProps('password')}
              />

              <div className="my-4 d-grid">
                <Button
                  type="submit"
                  variant="outline-primary"
                  disabled={isSubmitting}
                >
                  {t('login.submitButton')}
                </Button>
              </div>

              {authError ? <Form.Text className="text-danger">{t('formErrors.wrongLoginAndPassword')}</Form.Text> : null}
            </Form>
          )}
        </Formik>

        <hr />

        <div className="text-center">
          <span>{t('login.auth.text')}</span>
          {' '}
          <a href={routes.pages.signup}>{t('login.auth.link')}</a>
        </div>
      </Col>
    </Row>
  );
};

export default Login;