import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from "../contexts/AuthContext";
import Input from '../formElements/Input';
import routes from '../routes';

const SignUp = () => {
  const [authError, setAuthError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  yup.setLocale({
    string: {
      min: ({ min }) => t('formErrors.min', { count: min }),
      max: t('formErrors.max', { count: 20 }),
    },
    mixed: {
      required: t('formErrors.required'),
      oneOf: t('formErrors.confirmPassword'),
    }
  });

  const schema = yup.object({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
  });

  const submit = ({ username, password }, setSubmitting) => {
    axios.post(routes.signup, { username, password })
      .then(({ data: { token } }) => {
        auth.logIn(token, username);
        navigate(routes.pages.chat);
      })
      .catch(({ response: { status } }) => {
        if (status === 500) {
          toast.error(t('notification.sendDataError'));
          return;
        };
        setAuthError(true);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={11} md={6} lg={3} className="rounded p-5 mt-5 shadow bg-white">
        <h1 className="display-6 mb-3">{t('signUp.header')}</h1>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
        >
          {({ handleSubmit, getFieldProps, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                id="username"
                authError={String(authError)}
                type="text"
                label={t('signUp.username')}
                {...getFieldProps('username')}
              />

              <Input
                id="password"
                authError={false}
                type="password"
                label={t('signUp.password')}
                {...getFieldProps('password')}
              />

              <Input
                id="confirmPassword"
                authError={false}
                type="password"
                label={t('signUp.confirmPassword')}
                {...getFieldProps('confirmPassword')}
              />
              
              {authError ? <Form.Text className="text-danger">{t('formErrors.userExists')}</Form.Text> : null}

              <div className="my-4 d-grid">
                <Button
                  type="submit"
                  variant="outline-primary"
                  disabled={isSubmitting}
                >
                  {t('signUp.submitButton')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default SignUp;