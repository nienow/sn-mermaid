import React, {useRef, useState} from 'react';
import {TEST_DATA} from "./test-data";
import {MockStandardNotes} from "./mock-notes";

const mock = new MockStandardNotes(TEST_DATA[0], () => {
  const el = document.getElementById('last-saved');
  if (el) {
    el.textContent = `Last Saved: ${new Date().toLocaleTimeString()}`;
  }
});

const DemoApp = () => {
  const iframeRef = useRef<HTMLIFrameElement>();
  const [selected, setSelected] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [theme, setTheme] = useState('dark');

  const changeMenuItem = (i) => {
    setSelected(i);
    mock.changeData(TEST_DATA[i]);
  };

  const renderMenuItem = (_, i) => {
    return <div className={selected === i ? 'menu-item selected' : 'menu-item'}
                onClick={() => changeMenuItem(i)}>{TEST_DATA[i].title}</div>;
  };

  const onToggleDisabled = (e) => {
    setDisabled(e.target.checked);
    mock.toggleLock(e.target.checked);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
    mock.toggleTheme(e.target.checked);
  };

  const onFrameLoad = () => {
    mock.onReady(iframeRef.current.contentWindow);
  };
  return (
    <div className="demo">
      <div className="menu">
        {
          TEST_DATA.map(renderMenuItem)
        }
      </div>
      <div className="content">
        <iframe key={selected} ref={iframeRef} src="index.html" onLoad={onFrameLoad}/>
      </div>
    </div>
  );
}

export default DemoApp
