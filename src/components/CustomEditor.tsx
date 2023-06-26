import React from 'react';
import TextArea from "./TextArea";
import RowControl from "./RowControl";

const CustomEditor = () => {
  return (
    <div className="main">
      <h2>Editor Extension Template</h2>
      <RowControl/>
      <TextArea/>
    </div>
  );
}

export default CustomEditor
