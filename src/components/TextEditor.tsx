import React, {useRef} from 'react';
import {useEffect} from "preact/compat";
import * as monaco from 'monaco-editor';
import {getNoteText, updateNoteText} from "../sn-api";
import Examples from "./Examples";
import {styled} from "goober";

const CodePanel = styled('div')`
  padding: 4px 20px;
`;

let editor;
const TextEditor = ({onUpdate}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      minimap: {
        enabled: false
      },
      theme: 'mermaid-dark',
      language: 'mermaid',
      lineDecorationsWidth: 5,
      contextmenu: false,
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

    return () => {
      editor?.dispose();
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
      <CodePanel>
        <Examples onSelect={selectExample}/>
      </CodePanel>
    </>
  );
}

export default TextEditor
