import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --blue: #3cacff;
    --red: #e52e4d;
    --green: #48bb78;

    --white: #fff;
    --gray-50:  #c0c5ce;
    --gray-100: #a7adba;
    --gray-300: #65737e;
    --gray-500: #4f5b66;  
    --gray-700: #2d3748;
    --gray-800: #1a202c;
    --gray-900: #171923;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--gray-900);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;