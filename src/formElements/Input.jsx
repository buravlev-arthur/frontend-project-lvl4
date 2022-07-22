import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useField } from 'formik';

const Input = ({label, error, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3">
        <FloatingLabel label={label} controlId={props.id}>
          <Form.Control placeholder={label} isInvalid={(!!meta.error || error) && meta.touched} {...field} {...props} required />
          <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
        </FloatingLabel>        
      </Form.Group>      
    </>
  );
};

export default Input;