import { useState, useContext, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes';
import Input from '../formElements/Input';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [authError, setAuthError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  const schema = yup.object({
    username: yup.string()
      .min(2, 'Логин должен содержать не менее 2 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .required('Обязательное поле'),
  });

  useEffect(() => {
    if (auth.userIsLogged()) {
      navigate('/');
    }
  });

  const submit = (formData) => {
    axios.post(routes.login, formData)
      .then(({ data: { token } }) => {
        auth.logIn(token, formData.username);
        navigate('/');
      })
      .catch(() => setAuthError(true));
  };

  return (
    <Row>
      <Col xs={10} md={6} lg={3} className="border p-5 position-absolute top-50 start-50 translate-middle shadow-sm bg-white">
        <h1 className="display-6 mb-3">Войти</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={schema}
          onSubmit={submit}
        >
          {({ getFieldProps, handleSubmit }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <Input id="userName" authError={String(authError)} type="username" label="Логин" {...getFieldProps('username')} />
                <Input id="password" authError={String(authError)} type="password" label="Пароль" {...getFieldProps('password')} />
                <Form.Group className="my-4 d-grid">
                  <Button type="submit" variant="outline-primary">Отправить</Button>
                </Form.Group>
                {authError ? <Form.Text className="text-danger">Неверные логин или пароль</Form.Text> : null}
              </Form>
            </>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default Login;