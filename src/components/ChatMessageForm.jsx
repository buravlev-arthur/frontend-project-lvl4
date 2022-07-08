import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import SocketContext from '../contexts/SocketContext';
import AuthContext from '../contexts/AuthContext';

const ChatMessageForm = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const chat = useContext(SocketContext);
  const auth = useContext(AuthContext);

  const schema = yup.object({
    message: yup.string().required(),
  });

  return (
    <Formik
    initialValues={{ message: '' }}
    validationSchema={schema}
    onSubmit={({ message }, { resetForm }) => {
      const data = { body: message, channelId: currentChannelId, username: auth.getUsername() };
      chat.socket.emit('newMessage', data, resetForm);
    }}
    >
      {({ getFieldProps, handleSubmit, isSubmitting }) => (
        <Form className="border rounded" onSubmit={handleSubmit}>
          <InputGroup>
            <FormControl
              className="border-0"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              {...getFieldProps('message')}
            />
            <Button
              type="submit"
              variant="link"
              className="mb-1 text-dark"
              disabled={!getFieldProps('message').value.length || isSubmitting}
            >
              <ArrowRightCircleFill size={20} />
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default ChatMessageForm;