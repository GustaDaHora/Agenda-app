import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    color: whitesmoke;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  h1, h2, h3 {
    margin: 0;
    padding: 1rem;
    font-size: 2rem;
  }
`;

export default GlobalStyle;
