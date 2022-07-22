/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useField } from 'formik';

export default function Input({ label, error, ...props }) {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-3">
      <FloatingLabel label={label} controlId={props.id}>
        <Form.Control
          placeholder={label}
          isInvalid={(!!meta.error || error) && meta.touched}
          {...field}
          type={props.type}
          required
        />
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </FloatingLabel>
    </Form.Group>
  );
}
