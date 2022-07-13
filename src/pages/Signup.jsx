import { useContext, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AuthContext from "../contexts/AuthContext";
import Input from '../formElements/Input';
import routes from '../routes';

const SignUp = () => {
  const [authError, setAuthError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const schema = yup.object({
    username: yup.string()
      .min(3, 'Должно содержать не менее 3 символов')
      .max(20, 'Должно содержать не более 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Должен содержать не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароль и подтверждение должны совпадать')
      .required('Обязательное поле'),
  });

  const submit = ({ username, password }) => {
    axios.post(routes.signup, { username, password })
      .then(({ data: { token } }) => {
        auth.logIn(token, username);
        navigate('/');
      })
      .catch(() => setAuthError(true));
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={11} md={6} lg={3} className="rounded p-5 mt-5 shadow bg-white">
        <h1 className="display-6 mb-3">Регистрация</h1>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={schema}
          onSubmit={submit}
        >
          {({ handleSubmit, getFieldProps }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                id="username"
                authError={String(authError)}
                type="text"
                label="Имя пользователя"
                {...getFieldProps('username')}
              />

              <Input
                id="password"
                authError={false}
                type="password"
                label="Пароль"
                {...getFieldProps('password')}
              />

              <Input
                id="confirmPassword"
                authError={false}
                type="password"
                label="Подтвердите пароль"
                {...getFieldProps('confirmPassword')}
              />
              
              {authError ? <Form.Text className="text-danger">Такой пользователь уже существует</Form.Text> : null}

              <div className="my-4 d-grid">
                <Button type="submit" variant="outline-primary">Зарегестрироваться</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default SignUp;