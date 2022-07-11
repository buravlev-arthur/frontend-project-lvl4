import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import SocketContext from '../contexts/SocketContext';
import { selectors, setCurrentChannelId } from '../store/channelsSlice';

const ModalWindow = ({ show, close, type, channelId }) => {
  const dispatch = useDispatch();
  const chat = useContext(SocketContext);
  const channels = useSelector(selectors.selectAll).map(({ name }) => name);

  const schema = yup.object({
    name: yup.string()
      .required('Обязательное поле')
      .notOneOf(channels, 'Такой канал уже существует'),
  });

  const add = ({ name }) => {
    chat.socket.emit('newChannel', { name }, ({ data }) => {
      dispatch(setCurrentChannelId(data.id));
    });
    close();
  };

  const remove = () => {
    chat.socket.emit('removeChannel', { id: channelId });
    close();
  };

  const config = {
    add: {
      header: 'Добавить канал',
      submit: 'Добавить',
      submitType: 'dark',
      props: {
        initialValues: { name: '' },
        validationSchema: schema,
        onSubmit: add,
      },
    },
    remove: {
      header: 'Удалить канал',
      submit: 'Удалить',
      submitType: 'danger',
      props: {
        initialValues: {},
        onSubmit: remove,
      },
    },
  };

  const set = config[type];

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{set.header}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Formik {...set.props}>
          {({ getFieldProps, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              {type === 'remove' ? (
                <p className="lead">Будет удален канал. Вы уверены?</p>
              ) : (
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control type="text" autoFocus {...getFieldProps('name')} isInvalid={!!errors.name}></Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              )}

              <div className="d-flex justify-content-end">
                <Button variant={set.submitType} type="submit" className="me-2">{set.submit}</Button>
                <Button variant="secondary" type="button" onClick={close}>Отмена</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
