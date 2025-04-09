import mermaid from 'mermaid';
import {toBase64} from 'js-base64';
import snApi from 'sn-extension-api';

export const downloadPNG = () => {
  exportImage(downloadImage);
};

export const downloadSVG = () => {
  mermaid.render('export', snApi.text).then(({svg}) => {
    simulateDownload(getFileName('svg'), `data:image/svg+xml;base64,${getBase64SVG(svg)}`);
  });
};

const downloadImage = (context, image) => {
  return () => {
    const {canvas} = context;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    simulateDownload(
      getFileName('png'),
      canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    );
  };
};

const getFileName = (ext: string) =>
  `diagram-${new Date().getTime()}.${ext}`;

const simulateDownload = (download: string, href: string): void => {
  const a = document.createElement('a');
  a.download = download;
  a.href = href;
  a.click();
  a.remove();
};
const exportImage = (exporter: any) => {
  mermaid.render('export', snApi.text).then(({svg}) => {
    const [width, height] = calcSize(svg);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('context not found');
    }
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.onload = exporter(context, image);
    image.src = `data:image/svg+xml;base64,${toBase64(svg)}`;
  });
};

const calcSize = (svg: string) => {
  const start = svg.indexOf('viewBox="');
  const end = svg.indexOf('"', start + 9);
  const viewBox = svg.substring(start + 9, end);
  const parts = viewBox.split(' ');
  const width = Number(parts[2]);
  const height = Number(parts[3]);
  const ratio = 1000 / width;
  const newHeight = height * ratio;
  const newWidth = 1000;
  return [newWidth, newHeight];
};

const getBase64SVG = (svg: string): string => {
  const svgString = svg.replaceAll('<br>', '<br/>')
    .replaceAll(/<img([^>]*)>/g, (m, g: string) => `<img ${g} />`);
  return toBase64(svgString);
};
