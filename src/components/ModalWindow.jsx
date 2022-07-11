import { useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import SocketContext from '../contexts/SocketContext';
import { selectors, setCurrentChannelId } from '../store/channelsSlice';

const ModalWindow = ({ show, close, type, channelId, channelName }) => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useContext(SocketContext);
  const channels = useSelector(selectors.selectAll).map(({ name }) => name);

  useEffect(() => {
    if (show && type !== 'remove') {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [show]);

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

  const rename = ({ name }) => {
    chat.socket.emit('renameChannel', { id: channelId, name });
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
    rename: {
      header: 'Переименовать канал',
      submit: 'Переименовать',
      submitType: 'dark',
      props: {
        enableReinitialize: true,
        initialValues: { name: channelName },
        validationSchema: schema,
        onSubmit: rename,
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
                <p className="lead">Канал "{channelName}" будет удалён. Вы уверены?</p>
              ) : (
                <Form.Group className="mb-3 modal-input-block" controlId="name">
                  <Form.Control ref={inputEl} type="text" {...getFieldProps('name')} isInvalid={!!errors.name}></Form.Control>
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
