import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  input {
    border: 0;
    border-radius: 5px;
    padding: 0.5rem;
    background: var(--gray-500);
    color: var(--gray-50);
    font-size: 1rem;
    border: 2px solid var(--gray-300);
    
    &:focus {
      border-color: var(--blue);
    }

    &~input {
      margin-top: 2rem;
    }

    &.error {
      border-color: var(--red);
    }
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  bottom: -1rem;
  font-size: 0.75rem;
  color: var(--red);
`;