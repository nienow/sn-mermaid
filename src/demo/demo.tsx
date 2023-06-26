import React from 'react';

import '../index.scss';
import './demo.scss';
import {createRoot} from "react-dom/client";
import DemoApp from "./DemoApp";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DemoApp/>
  </React.StrictMode>
);

