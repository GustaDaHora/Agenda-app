import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    color: whitesmoke;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  h1, h2, h3 {  
    -webkit-text-stroke: 1px black;
  }
`;

export default GlobalStyle;
