import React from "react";
import * as ReactDOMClient from "react-dom/client";
import GlobalStyle from "./styles.js";
import AgendaPage from "./Agenda.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <>
    <GlobalStyle />
    <AgendaPage />
  </>
);
