import React, {useRef} from 'react';
import {useEffect} from "preact/compat";
import * as monaco from 'monaco-editor';
import {updateNoteText} from "../sn-api";


const TextEditor = ({code, onUpdate}) => {
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
      value: code
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    let editor = monaco.editor.create(ref.current, editorOptions);
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
    // editor.addAction({
    //   id: 'mermaid-render-diagram',
    //   label: 'Render Diagram',
    //   keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
    //   run: function () {
    //     // syncDiagram();
    //   }
    // });
    // monaco.editor.setTheme($themeStore.isDark ? 'mermaid-dark' : 'mermaid');
    // const resizeObserver = new ResizeObserver((entries) => {
    //   editor?.layout({
    //     height: entries[0].contentRect.height,
    //     width: entries[0].contentRect.width
    //   });
    // });
    //
    // if (document.body) {
    //   resizeObserver.observe(document.body);
    // }

    window.addEventListener('resize', () => {
      editor?.layout({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth
      });
    });

    return () => {
      // console.log(`editor disposed`);
      editor?.dispose();
    };
  }, [code]);
  return (
    <>
      <div ref={ref} id="editor" className="code-container"></div>
    </>
  );
}

export default TextEditor
