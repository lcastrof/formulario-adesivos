import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api';

import { Input } from "../Input";
import { Container, FormContainer, SuccessMessage, InternalErrorMessage } from "./styles";

type FormData = {
  name: string;
  email: string;
  phone: string;
  addressZip: string;
  addressStreet: string;
  addressNumber: number;
  addressComplement: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
}

type ResponseError = {
  field: string;
  error: string;
}

const formSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório').min(7, 'O nome deve ter mais que 7 caracteres'),
  email: yup.string().required('E-mail obrigatório').email('Digite um email válido'),
  phone: yup.string().required('Telefone obrigatório'),
  addressZip: yup.string().required('CEP obrigatório'),
  addressStreet: yup.string().required('Logradouro obrigatório'),
  addressNumber: yup.number().typeError('Digite um número').positive('Favor digitar apenas números positivos').required('Número obrigatório'),
  addressComplement: yup.string().required('Complemento obrigatório'),
  addressDistrict: yup.string().required('Bairro obrigatório'),
  addressCity: yup.string().required('Cidade obrigatória'),
  addressState: yup.string().required('Estado obrigatório'),
});

export function Form() {
  const [successSubmitting, setSuccessSubmiting] = useState(false);
  const [internalErrorSubmitting, setInternalErrorSubmitting] = useState(false);

  const { register, handleSubmit, formState, setError } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { errors } = formState;

  const handleFormSubmit: SubmitHandler<FormData> = async (values) => {
    const formattedValues = {
      ...values, 
      phone: Number(values.phone.match(/\d/g)?.join("")),
      addressZip: Number(values.addressZip.match(/\d/g)?.join("")),
    }

    try {
      await api.post('https://simple-api-selection.herokuapp.com/submit/', formattedValues);
    
      setSuccessSubmiting(true);
    } catch (err) {
      if (err.response.status === 400) {
        err.response.data.forEach((error: ResponseError) => {
          setError(error.field, {
            type: "manual",
            message: error.error
          });
        });
      } else {
        setInternalErrorSubmitting(true);
      }
    }
  }

  const handleReturnToForm = () => {
    setSuccessSubmiting(false);
    setInternalErrorSubmitting(false);
  }

  return (
    <Container>
      {(!successSubmitting && !internalErrorSubmitting) ? (
        <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
          <h1>Formulário de Adesivos</h1>
          <Input autoFocus id="name" type="text" error={errors.name} label="Nome" {...register('name')} />
          <Input id="email" type="email" error={errors.email} label="E-mail" {...register('email')} />
          <Input id="phone" type="tel" error={errors.phone} label="Telefone" {...register('phone')} />
          <Input id="addressZip" type="text" error={errors.addressZip} label="CEP" {...register('addressZip')} />
          <fieldset>
            <Input id="addressStreet" type="text" error={errors.addressStreet} label="Logradouro" {...register('addressStreet')} />

            <div className="addressWrap">
              <Input id="addressNumber" type="number" error={errors.addressNumber} label="Número" {...register('addressNumber')} />
              <Input id="addressComplement" type="text" error={errors.addressComplement} label="Complemento" {...register('addressComplement')} />
              <Input id="addressDistrict" type="text" error={errors.addressDistrict} label="Bairro" {...register('addressDistrict')} />
              <Input id="addressCity"  type="text" error={errors.addressCity} label="Cidade" {...register('addressCity')} />
              <Input id="addressState"  type="text" error={errors.addressState} label="Estado" {...register('addressState')} />
            </div>
          </fieldset>

          {!formState.isSubmitting ? <button type="submit">Enviar</button> : <span>Loading...</span> }
        </FormContainer>
      ) : successSubmitting ? (
        <SuccessMessage>
          <h2>Muito bom! Você receberá seus adesivos em alguns dias</h2>
          <button type="button" onClick={handleReturnToForm}>Voltar</button>
        </SuccessMessage>
      ) : (
        <InternalErrorMessage>
          <h2>
            Um erro aconteceu e seus dados <strong>não</strong> foram enviados.
            Por favor, tente novamente em alguns instantes.
          </h2>
          <button type="button" className="error" onClick={handleReturnToForm}>Voltar</button>
        </InternalErrorMessage>
      ) }
      
    </Container>
  );
}