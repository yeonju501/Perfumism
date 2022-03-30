import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
  ul{
    list-style: none;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
