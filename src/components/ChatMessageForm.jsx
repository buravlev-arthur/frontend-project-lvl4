import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as yup from 'yup';

const ChatMessageForm = () => {
  const schema = yup.object({
    message: yup.string().required(),
  });

  const submit = (formData) => {
    console.log(formData);
  };

  return (
    <Formik
    initialValues={{ message: '' }}
    validationSchema={schema}
    onSubmit={submit}
    >
      {({ getFieldProps, handleSubmit, errors }) => (
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
              disabled={!getFieldProps('message').value.length ? true : false}
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