import React, {useState} from 'react';
import TextEditor from "./TextEditor";
import {styled} from "goober";
import MermaidDisplay from "./MermaidDisplay";
import snApi from "sn-extension-api";


const Container = styled('div')`
  display: flex;
`;

const CodeContainer = styled('div')`
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;


const MermaidEditor = () => {
  const [code, setCode] = useState(snApi.text);
  return (
    <Container>
      <CodeContainer>
        <TextEditor onUpdate={setCode}/>

      </CodeContainer>

      <MermaidDisplay code={code}/>
    </Container>
  );
}

export default MermaidEditor
