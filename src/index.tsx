import React from 'react';

import './index.scss';
import {createRoot} from "react-dom/client";
import MermaidEditor from "./components/MermaidEditor";
import mermaidAPI from "mermaid";
import {setup} from "goober";
import {initEditor} from "./util/monacoExtra";
import * as monaco from "monaco-editor";
import snApi from "sn-extension-api";

setup(React.createElement);

const root = createRoot(document.getElementById('diagrams-root'));

export const rerenderRoot = () => {
  root.render(
    <React.StrictMode>
      <MermaidEditor/>
    </React.StrictMode>
  );
};


snApi.initialize();

snApi.subscribe(() => {
  rerenderRoot();
});

mermaidAPI.initialize({
  startOnLoad: false, theme: 'dark'
});

initEditor(monaco);





