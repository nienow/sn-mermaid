import React, {useRef, useState} from 'react';
import {useEffect} from "preact/compat";
import * as monaco from 'monaco-editor';
import {getNoteText, isNoteLocked, subscribeToNoteChanges, unsubscribeToNotechanges, updateNoteText} from "../sn-api";
import Examples from "./Examples";
import {styled} from "goober";

const CodePanel = styled('div')`
  padding: 4px 20px;
`;

let editor;


const TextEditor = ({onUpdate}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showExamples, setShowExamples] = useState(!isNoteLocked());

  const onNoteChanges = () => {
    setShowExamples(!isNoteLocked());
    if (editor) {
      editor.updateOptions({readOnly: isNoteLocked()});
    }
  };

  useEffect(() => {
    let editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      minimap: {
        enabled: false
      },
      theme: 'mermaid-dark',
      language: 'mermaid',
      lineDecorationsWidth: 5,
      contextmenu: false,
      readOnly: isNoteLocked(),
      value: getNoteText()
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    editor = monaco.editor.create(ref.current, editorOptions);
    let text = '';
    editor.onDidChangeModelContent(({isFlush, changes}) => {
      const newText = editor?.getValue();
      // console.log('editor onDidChangeModelContent', { text, newText, isFlush, changes });
      if (!newText || text === newText || isFlush) {
        return;
      }
      text = newText;
      updateNoteText(text);
      onUpdate(text);
    });

    window.addEventListener('resize', () => {
      editor?.layout({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth
      });
    });

    subscribeToNoteChanges(onNoteChanges);

    return () => {
      editor?.dispose();
      unsubscribeToNotechanges(onNoteChanges);
    };
  }, []);

  const selectExample = (val) => {
    editor.getModel().setValue(val);
    onUpdate(val);
    updateNoteText(val);
  };

  return (
    <>
      <div ref={ref} id="editor" className="code-container"></div>
      {showExamples && <CodePanel>
        <Examples onSelect={selectExample}/>
      </CodePanel>}
    </>
  );
}

export default TextEditor
