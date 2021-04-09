import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  
  button {
    border: 0;
    margin-top: 2rem;
    border-radius: 5px;
    padding: 1rem;
    color: var(--white);
    font-weight: bold;
    font-size: 1.125rem;
    background: var(--green);

    transition: filter 0.2s ease;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  padding: 2rem;

  background: var(--gray-700);

  fieldset {
    border: 0;
    
    .addressWrap {

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }

  span {
    display: block;
    text-align: center;
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--blue);
  }
  
`;

export const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  padding: 2rem;

  background: var(--gray-700);
`;

export const InternalErrorMessage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  padding: 2rem;

  background: var(--gray-700);

  button.error {
    background: var(--red);
  }
`;