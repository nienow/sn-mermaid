import React, {useState} from 'react';
import {styled} from "goober";
import {downloadPNG, downloadSVG} from "../util/saveImage";
import {ActionButton} from "./Button";

const Dialog = styled('div')`
  position: absolute;
  bottom: 30px;
  background-color: var(--sn-stylekit-contrast-background-color);
  z-index: 1;
  border: 1px solid var(--sn-stylekit-border-color);
`;

const MenuItem = styled('div')`
  cursor: pointer;
  padding: 5px 20px;

  &:hover {
    background-color: var(--sn-stylekit-background-color);;
  }
`;

const SaveMenu = () => {
  const [open, setOpen] = useState(false);

  const onDownloadPNG = () => {
    downloadPNG();
    setOpen(false);
  };

  const onDownloadSVG = () => {
    downloadSVG();
    setOpen(false);
  };

  // const onCopy = () => {
  //   copyClipboard();
  //   setOpen(false);
  // };
  const renderDialog = () => {
    if (!open) {
      return <></>;
    }

    return <Dialog>
      {/*<MenuItem onClick={onCopy}>Copy to Clipboard</MenuItem>*/}
      <MenuItem onClick={onDownloadPNG}>Download PNG</MenuItem>
      <MenuItem onClick={onDownloadSVG}>Download SVG</MenuItem>
    </Dialog>
  };

  return (
    <>
      <ActionButton onClick={() => setOpen(!open)}>Save Image</ActionButton>
      {renderDialog()}
    </>
  );
}

export default SaveMenu
