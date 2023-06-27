import React, {useRef} from 'react';
import mermaid from 'mermaid';
import {useEffect} from "preact/compat";
import panzoom from 'svg-pan-zoom';
import {styled} from "goober";
import {ActionButton} from "./Button";
import {downloadPNG, downloadSVG} from "../util/saveImage";

const OutputContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 60%;
`;

const Output = styled('div')`
  flex: 1 1 auto;
  overflow: hidden;
`;

const BottomPanel = styled('div')`
  padding: 4px 20px;
  display: flex;
`;

const BottomRight = styled('div')`
  flex: 1 1 auto;
  text-align: right;
`;

let pzoom;
const MermaidDisplay = ({code}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code) {
      return;
    }
    mermaid.render('sn-output', code).then(({svg, fns}) => {

      document.getElementById('output-container').innerHTML = svg;

      const outputEl = document.getElementById('sn-output');
      outputEl.setAttribute('height', '100%');
      outputEl.style.maxWidth = '100%';
      pzoom = panzoom(outputEl, {
        controlIconsEnabled: false,
        fit: true,
        center: true,

      });
      if (fns) {
        fns(outputEl);
      }
    }).catch(err => {
      document.getElementById('dsn-output')?.remove();
      document.getElementById('output-container').innerHTML = err.message;
    });

  }, [code]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (pzoom) {
        pzoom.resize();
      }
    });
  }, []);

  const zoomIn = () => {
    pzoom.zoomIn();
  };

  const zoomOut = () => {
    pzoom.zoomOut();
  };

  const reset = () => {
    pzoom.reset();
  };

  return (
    <OutputContainer>
      <Output id="output-container" ref={ref}></Output>
      <BottomPanel>
        <div>
          <ActionButton onClick={downloadPNG}>Save PNG</ActionButton>
          <ActionButton onClick={downloadSVG}>Save SVG</ActionButton>
        </div>
        <BottomRight>
          <ActionButton onClick={zoomOut}>-</ActionButton>
          <ActionButton onClick={reset}>Reset</ActionButton>
          <ActionButton onClick={zoomIn}>+</ActionButton>
        </BottomRight>
      </BottomPanel>
    </OutputContainer>
  );
}

export default MermaidDisplay
