import React, {useState} from 'react';
import {getNoteMetadata, isNoteLocked, updateNoteMetadata} from "../sn-api";
import {rerenderRoot} from "../index";

const RowControl = () => {
  const [rows, setRows] = useState(getNoteMetadata().rows || 3);

  const changeRows = (newRows: number) => {
    setRows(newRows);
    updateNoteMetadata({rows: newRows});
    rerenderRoot();
  };

  return (
    <div>
      <button disabled={isNoteLocked()} onClick={() => changeRows(rows - 1)}>-</button>
      <span> {rows} Rows </span>
      <button disabled={isNoteLocked()} onClick={() => changeRows(rows + 1)}>+</button>
      <span> (This is an example of saving metadata outside of the note content).</span>
    </div>
  );
}

export default RowControl
