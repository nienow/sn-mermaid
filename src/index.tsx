import React from 'react';

import './index.scss';
import {createRoot} from "react-dom/client";
import CustomEditor from "./components/CustomEditor";
import {connectToStandardNotes} from "./sn-api";


const root = createRoot(document.getElementById('root'));

export const rerenderRoot = () => {
  root.render(
    <React.StrictMode>
      <CustomEditor/>
    </React.StrictMode>
  );
};

connectToStandardNotes(rerenderRoot);






