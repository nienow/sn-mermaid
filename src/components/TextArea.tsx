import React, {useState} from 'react';
import {getNoteMetadata, getNoteText, isNoteLocked, updateNoteText} from "../sn-api";

const TextArea = () => {
  const [value, setValue] = useState(getNoteText());

  const onLocalChange = (e) => {
    setValue(e.target.value);
    updateNoteText(e.target.value);
  };

  const rows = getNoteMetadata().rows;
  return (
    <textarea rows={rows || 3} disabled={isNoteLocked()} value={value} onChange={onLocalChange}></textarea>
  );
}

export default TextArea
