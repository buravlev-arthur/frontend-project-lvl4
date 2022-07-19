import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useField } from 'formik';

const Input = ({label, error, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group controlId={props.id} className="mb-3">
        <FloatingLabel label={label}>
          <Form.Control placeholder={label} isInvalid={!!meta.error || error} {...field} {...props} />
          <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>  
        </FloatingLabel>        
      </Form.Group>      
    </>
  );
};

export default Input;