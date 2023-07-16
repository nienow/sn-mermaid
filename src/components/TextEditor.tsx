import React, {useRef, useState} from 'react';
import {useEffect} from "preact/compat";
import * as monaco from 'monaco-editor';
import Examples from "./Examples";
import {styled} from "goober";
import snApi from "sn-extension-api";


const CodePanel = styled('div')`
  padding: 4px 20px;
`;

let editor;

const TextEditor = ({onUpdate}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showExamples, setShowExamples] = useState(!snApi.locked);

  useEffect(() => {
    let editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      minimap: {
        enabled: false
      },
      theme: 'mermaid-dark',
      language: 'mermaid',
      lineDecorationsWidth: 5,
      contextmenu: false,
      readOnly: snApi.locked,
      value: snApi.text
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
      snApi.updateNote(text);
      onUpdate(text);
    });

    window.addEventListener('resize', () => {
      editor?.layout({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth
      });
    });

    const unsub = snApi.subscribe(() => {
      setShowExamples(!snApi.locked);
      if (editor) {
        editor.updateOptions({readOnly: snApi.locked});
      }
    });

    return () => {
      editor?.dispose();
      unsub();
    };
  }, []);

  const selectExample = (val) => {
    editor.getModel().setValue(val);
    onUpdate(val);
    snApi.updateNote(val);
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
