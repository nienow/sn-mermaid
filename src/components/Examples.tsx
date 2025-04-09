import {useState} from 'react';
import {styled} from "goober";
import {EXAMPLES} from "../util/examples";
import {ActionButton} from "./Button";


const Dialog = styled('div')`
  position: absolute;
  bottom: 30px;
  background-color: var(--sn-stylekit-contrast-background-color);
  z-index: 1;
`;

const MenuItem = styled('div')`
  cursor: pointer;
  padding: 5px 20px;

  &:hover {
    background-color: var(--sn-stylekit-background-color);
  }
`;

const Examples = ({onSelect}) => {
  const [open, setOpen] = useState(false);

  const selectExample = (value) => {
    onSelect(value);
    setOpen(false);
  };
  const renderDialog = () => {
    if (!open) {
      return <></>;
    }

    return <Dialog>
      {
        Object.entries(EXAMPLES).map(([key, value]) => {
          return <MenuItem onClick={() => selectExample(value)}>{key}</MenuItem>;
        })
      }
    </Dialog>;
  };

  return (
    <>
      <ActionButton onClick={() => setOpen(!open)}>Examples</ActionButton>
      {renderDialog()}
    </>
  );
};

export default Examples;
