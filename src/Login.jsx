import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from './formElements/Input';

const schema = yup.object({
  username: yup.string()
    .min(2, 'Логин должен содержать не менее 2 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .required('Обязательное поле'),
});

const Login = () => {
  return (
    <Row>
      <Col xs={10} md={6} lg={3} className="border p-5 position-absolute top-50 start-50 translate-middle shadow-sm bg-white">
        <h1 className="display-6 mb-3">Войти</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={schema}
          onSubmit={console.log}
        >
          {({ getFieldProps, handleSubmit }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <Input id="username" type="username" label="Логин" {...getFieldProps('username')} />
                <Input id="password" type="password" label="Пароль" {...getFieldProps('password')} />
                <Form.Group className="my-4 d-grid">
                  <Button type="submit" variant="outline-primary">Отправить</Button>
                </Form.Group>
              </Form>
            </>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default Login;