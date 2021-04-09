import { forwardRef, InputHTMLAttributes, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import InputMask from 'react-input-mask';

import { Container, ErrorMessage } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
  ({ label, error=null, ...props }, ref) => {
  
  return (
    <Container>
      {label && <label htmlFor={props.id}>{label}</label>}

      {props.id === 'phone' || props.id === 'addressZip' ? (
        props.id === 'phone' 
          ? <InputMask {...props} mask="(99) 99999-9999">{() => <input className={!!error ? 'error' : ''} ref={ref} {...props} />}</InputMask>
          : <InputMask {...props} mask="99999-999">{() => <input className={!!error ? 'error' : ''} ref={ref} {...props} />}</InputMask>
      ) : (
        <input className={!!error ? 'error' : ''} ref={ref} {...props} />
      )}

      {!!error && (
        <ErrorMessage>
          {error.message}
        </ErrorMessage>
      )}
      
    </Container>
  );
}

export const Input = forwardRef(InputBase);