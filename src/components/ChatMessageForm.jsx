import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import filter from 'leo-profanity';
import AuthContext from '../contexts/AuthContext';
import { sendMessage } from '../socket';

const ChatMessageForm = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  filter.loadDictionary('ru');

  const schema = yup.object({
    message: yup.string().required(),
  });

  const submit = (message, resetForm) => {
    const data = { body: filter.clean(message, '*'), channelId: currentChannelId, username: auth.getUsername() };
    sendMessage(data, resetForm);
  };

  return (
    <Formik
    initialValues={{ message: '' }}
    validationSchema={schema}
    onSubmit={({ message }, { resetForm }) => submit(message, resetForm)}
    >
      {({ getFieldProps, handleSubmit, isSubmitting, dirty }) => (
        <Form className="border rounded" onSubmit={handleSubmit}>
          <InputGroup>
            <FormControl
              className="border-0"
              placeholder={t('chat.form.placeholder')}
              aria-label={t('chat.form.ariaLabel')}
              {...getFieldProps('message')}
            />
            <Button
              type="submit"
              variant="link"
              className="mb-1 text-dark"
              disabled={!dirty || isSubmitting}
            >
              <ArrowRightCircleFill size={20} />
              <span className="visually-hidden">{t('chat.form.submitButton')}</span>
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default ChatMessageForm;