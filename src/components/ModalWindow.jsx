/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { closeModalWindow } from '../store/modalSlice';
import { selectors } from '../store/channelsSlice';
import SocketContext from '../contexts/SocketContext';

export default function ModalWindow() {
  const {
    show,
    type,
    channelId,
    channelName,
  } = useSelector(({ modalWindow }) => modalWindow.params);
  const dispatch = useDispatch();
  const inputEl = useRef();
  const channels = useSelector(selectors.selectAll).map(({ name }) => name);
  const { addNewChannel, deleteChannel, setChannelName } = useContext(SocketContext);
  const { t } = useTranslation();

  const close = () => {
    dispatch(closeModalWindow());
  };

  const callback = (action) => () => {
    toast.success(t(`notification.${action}Channel`));
    close();
  };

  useEffect(() => {
    if (show && type !== 'remove') {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [show, type]);

  yup.setLocale({
    mixed: {
      required: t('formErrors.required'),
      notOneOf: t('formErrors.channelExists'),
    },
  });

  const schema = yup.object({
    name: yup.string().required().notOneOf(channels),
  });

  const config = {
    add: {
      header: t('chat.modalWindow.add.header'),
      label: t('chat.modalWindow.add.label'),
      submit: t('chat.modalWindow.add.submit'),
      submitType: 'dark',
      props: {
        initialValues: { name: '' },
        validationSchema: schema,
        onSubmit: ({ name }) => addNewChannel(filter.clean(name, '*'), callback('add')),
      },
    },
    remove: {
      header: t('chat.modalWindow.remove.header'),
      submit: t('chat.modalWindow.remove.submit'),
      submitType: 'danger',
      props: {
        initialValues: {},
        onSubmit: () => deleteChannel(channelId, callback('remove')),
      },
    },
    rename: {
      header: t('chat.modalWindow.rename.header'),
      label: t('chat.modalWindow.rename.label'),
      submit: t('chat.modalWindow.rename.submit'),
      submitType: 'dark',
      props: {
        initialValues: { name: channelName },
        validationSchema: schema,
        onSubmit: ({ name }) => setChannelName({ id: channelId, name: filter.clean(name, '*') }, callback('rename')),
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
        <Formik
          initialValues={set.props.initialValues}
          validationSchema={set.props.validationSchema}
          onSubmit={set.props.onSubmit}
        >
          {({
            getFieldProps,
            handleSubmit,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              {type === 'remove' ? (
                <p className="lead">{t('chat.modalWindow.remove.warning', { name: channelName })}</p>
              ) : (
                <Form.Group className="mb-3 modal-input-block">
                  <Form.Label htmlFor="name" className="visually-hidden">{set.label}</Form.Label>
                  <Form.Control id="name" ref={inputEl} type="text" {...getFieldProps('name')} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              )}

              <div className="d-flex justify-content-end">
                <Button variant={set.submitType} type="submit" className="me-2" disabled={isSubmitting}>{set.submit}</Button>
                <Button variant="secondary" type="button" onClick={close}>{t('chat.modalWindow.cancelButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
